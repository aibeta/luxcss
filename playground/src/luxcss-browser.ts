import { colorValue, colorValueKeys, enumValue, enumValueKeys, unitValue, unitValueKeys } from 'virtual:luxcss-registry';

const classBoundary = '[^A-Za-z0-9_:-]';
const unitValuePattern = '-?\\d+(?:d\\d+)?n|-?\\d+p\\d*|-?\\d+d\\d+|-?\\d+';
const hexColorPattern = '[a-fA-F0-9]{6}|[a-fA-F0-9]{3}';

export interface GeneratedCssResult {
  css: string;
  matchedClasses: string[];
  unknownClasses: string[];
  previewClassName: string;
  stats: {
    enumCount: number;
    unitCount: number;
    colorCount: number;
    unknownCount: number;
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sortedAlternation(values: string[]): string {
  return values
    .slice()
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .map(escapeRegExp)
    .join('|');
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function collectClassMatches(source: string, classPattern: string): string[] {
  const regex = new RegExp(`(^|${classBoundary})(${classPattern})(?=$|${classBoundary})`, 'g');
  const result: string[] = [];
  let match = regex.exec(source);

  while (match) {
    result.push(match[2]);
    match = regex.exec(source);
  }

  return result;
}

function collectUnknownClasses(source: string, matchedClasses: string[]): string[] {
  const roughTokens = source.match(/(?:^|[^A-Za-z0-9_:-])((?:l|u)-[A-Za-z0-9_-]+)/g) || [];
  const matchedSet = new Set(matchedClasses);

  return uniqueSorted(roughTokens
    .map((token) => token.replace(/^[^A-Za-z0-9_:-]+/, ''))
    .filter((token) => !matchedSet.has(token)));
}

function formatDeclarations(declarationText: string): string {
  return declarationText
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => {
      const separatorIndex = declaration.indexOf(':');
      if (separatorIndex < 0) return `  ${declaration};`;

      const property = declaration.substring(0, separatorIndex).trim();
      const value = declaration.substring(separatorIndex + 1).trim();
      return `  ${property}: ${value};`;
    })
    .join('\n');
}

function makeRule(className: string, declarationText: string): string {
  return `.${className} {\n${formatDeclarations(declarationText)}\n}`;
}

function toCssValue(rawValue: string): string {
  let value = rawValue;
  let unitless = false;

  if (value.endsWith('n')) {
    unitless = true;
    value = value.substring(0, value.length - 1);
  }

  if (value.includes('p')) {
    const numeric = value.endsWith('p')
      ? value.substring(0, value.length - 1)
      : value.replace('p', '.');
    return `${numeric}%`;
  }

  if (value.includes('d')) {
    return value.replace('d', '.');
  }

  return unitless ? value : `${value}px`;
}

function parseUnitToken(token: string): { key: string; rawValue: string } | undefined {
  const keys = sortedAlternation(unitValueKeys);
  const regex = new RegExp(`^u-(${keys})(${unitValuePattern})$`);
  const result = token.match(regex);
  if (!result) return undefined;
  return { key: result[1], rawValue: result[2] };
}

function parseColorToken(token: string): { key: string; rawValue: string } | undefined {
  const keys = sortedAlternation(colorValueKeys);
  const regex = new RegExp(`^u-(${keys})(${hexColorPattern})$`);
  const result = token.match(regex);
  if (!result) return undefined;
  return { key: result[1], rawValue: result[2] };
}

export function generateLuxCss(source: string): GeneratedCssResult {
  const enumKeys = sortedAlternation(enumValueKeys);
  const unitKeys = sortedAlternation(unitValueKeys);
  const colorKeys = sortedAlternation(colorValueKeys);

  const enumClasses = uniqueSorted(collectClassMatches(source, `l-(?:${enumKeys})`));
  const unitClasses = uniqueSorted(collectClassMatches(source, `u-(?:${unitKeys})(?:${unitValuePattern})`));
  const colorClasses = uniqueSorted(collectClassMatches(source, `u-(?:${colorKeys})(?:${hexColorPattern})`));
  const matchedClasses = uniqueSorted([...enumClasses, ...unitClasses, ...colorClasses]);

  const rules = [
    ...enumClasses.map((token) => {
      const key = token.substring(2);
      return makeRule(token, enumValue[key]);
    }),
    ...unitClasses.map((token) => {
      const parsed = parseUnitToken(token);
      if (!parsed) return '';
      return makeRule(token, `${unitValue[parsed.key]}: ${toCssValue(parsed.rawValue)};`);
    }),
    ...colorClasses.map((token) => {
      const parsed = parseColorToken(token);
      if (!parsed) return '';
      return makeRule(token, `${colorValue[parsed.key]}: #${parsed.rawValue};`);
    }),
  ].filter(Boolean);

  const css = `/* luxcss */\n${rules.join('\n\n')}\n`;
  const unknownClasses = collectUnknownClasses(source, matchedClasses);

  return {
    css,
    matchedClasses,
    unknownClasses,
    previewClassName: matchedClasses.join(' '),
    stats: {
      enumCount: enumClasses.length,
      unitCount: unitClasses.length,
      colorCount: colorClasses.length,
      unknownCount: unknownClasses.length,
    },
  };
}

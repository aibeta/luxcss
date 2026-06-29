const { enumValue, unitValue, colorValue } = require('../base');
const { unit } = require('../config');

interface ClassGroups {
  [name: string]: string[];
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
    value = value.replace('d', '.');
    return value;
  }

  return unitless ? value : `${value}${unit}`;
}

function makeBaseList(uniqueBaseList: string[]): string[] {
  return uniqueBaseList
    .map((name) => {
      const declaration = enumValue[name];
      if (!declaration) return '';
      return makeRule(`l-${name}`, declaration);
    })
    .filter(Boolean);
}

function makeUnitList(unitData: ClassGroups): string[] {
  const rules: string[] = [];

  Object.keys(unitData).forEach((key: string) => {
    const property = unitValue[key];
    if (!property) return;

    unitData[key].forEach((rawValue) => {
      rules.push(makeRule(`u-${key}${rawValue}`, `${property}: ${toCssValue(rawValue)};`));
    });
  });

  return rules;
}

function makeColorList(colorData: ClassGroups): string[] {
  const rules: string[] = [];

  Object.keys(colorData).forEach((key) => {
    const property = colorValue[key];
    if (!property) return;

    colorData[key].forEach((rawValue) => {
      rules.push(makeRule(`u-${key}${rawValue}`, `${property}: #${rawValue};`));
    });
  });

  return rules;
}

export function makeLessTemplate(uniqueBaseList: string[], unitData: ClassGroups, colorData: ClassGroups): string {
  const rules = [
    ...makeBaseList(uniqueBaseList),
    ...makeUnitList(unitData),
    ...makeColorList(colorData),
  ];

  return `/* luxcss */\n${rules.join('\n\n')}\n`;
}


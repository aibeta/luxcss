const { enumValueKeys, unitValueKeys, colorValueKeys } = require('../base');

const CLASS_BOUNDARY = '[^A-Za-z0-9_-]';
const UNIT_VALUE_PATTERN = '-?\\d+(?:d\\d+)?n|-?\\d+p\\d*|-?\\d+d\\d+|-?\\d+';
const HEX_COLOR_PATTERN = '[a-fA-F0-9]{6}|[a-fA-F0-9]{3}';

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

function collectClassMatches(str: string, classPattern: string): string[] {
  const regex = new RegExp(`(^|${CLASS_BOUNDARY})(${classPattern})(?=$|${CLASS_BOUNDARY})`, 'g');
  const result: string[] = [];
  let match = regex.exec(str);

  while (match) {
    result.push(match[2]);
    match = regex.exec(str);
  }

  return result;
}

export function matchEnum(str: string): string[] {
  const keys = sortedAlternation(enumValueKeys);
  return collectClassMatches(str, `l-(?:${keys})`);
}

export function matchUnit(str: string): string[] {
  const keys = sortedAlternation(unitValueKeys);
  return collectClassMatches(str, `u-(?:${keys})(?:${UNIT_VALUE_PATTERN})`);
}

export function matchColor(str: string): string[] {
  const keys = sortedAlternation(colorValueKeys);
  return collectClassMatches(str, `u-(?:${keys})(?:${HEX_COLOR_PATTERN})`);
}

export function filter(str: string) {
  return {
    unit: matchUnit(str),
    enums: matchEnum(str),
    color: matchColor(str),
  };
}

export default {
  filter,
  matchEnum,
  matchUnit,
  matchColor,
};

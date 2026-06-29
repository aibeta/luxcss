const { colorValueKeys, unitValueKeys } = require('../base');

interface ClassGroups {
  [name: string]: string[];
}

const UNIT_VALUE_PATTERN = '-?\\d+(?:d\\d+)?n|-?\\d+p\\d*|-?\\d+d\\d+|-?\\d+';
const HEX_COLOR_PATTERN = '[a-fA-F0-9]{6}|[a-fA-F0-9]{3}';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sortedUnique(list: string[]): string[] {
  return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b));
}

function sortedAlternation(values: string[]): string {
  return values
    .slice()
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .map(escapeRegExp)
    .join('|');
}

function addGroupValue(groups: ClassGroups, key: string, value: string) {
  const oldList = groups[key] || [];
  if (!oldList.includes(value)) {
    groups[key] = oldList.concat(value).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }
}

export function extractEnum(baseList: string[]): string[] {
  return sortedUnique(baseList)
    .filter((word) => word.startsWith('l-'))
    .map((word) => word.substring(2));
}

// Split class tokens into property prefix and value.
// Example: u-ml-20 -> { ml: ['-20'] }, u-lh1d5 -> { lh: ['1d5'] }
export function extractUnit(unitList: string[]): ClassGroups {
  const groups: ClassGroups = {};
  const keys = sortedAlternation(unitValueKeys);
  const regex = new RegExp(`^u-(${keys})(${UNIT_VALUE_PATTERN})$`);

  sortedUnique(unitList).forEach((word) => {
    const result = word.match(regex);
    if (!result) return;

    addGroupValue(groups, result[1], result[2]);
  });

  return groups;
}

export function extractColor(colorList: string[]): ClassGroups {
  const groups: ClassGroups = {};
  const keys = sortedAlternation(colorValueKeys);
  const regex = new RegExp(`^u-(${keys})(${HEX_COLOR_PATTERN})$`);

  sortedUnique(colorList).forEach((word) => {
    const result = word.match(regex);
    if (!result) return;

    addGroupValue(groups, result[1], result[2]);
  });

  return groups;
}

export default {
  extractEnum,
  extractColor,
  extractUnit,
};

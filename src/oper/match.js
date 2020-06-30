
const { enumValueKeys, unitValueKeys, colorValueKeys } = require('../base');

function matchEnum(str) {
  const keys = enumValueKeys.join('|');

  const regex = new RegExp(`l-(${keys})(\\s|'|")`, 'g');
  const result = str.match(regex);
  if (!result) return [];
  return result.map(d => d.substring(0, d.length - 1));
}

function matchUnit(str) {
  const keys = unitValueKeys.join('|');

  // /lux-(w|h|lh|minh|maxh|minw|maxw|br|mt|mr|mb|ml|pt|pr|pb|pl|fs|bdw)\d+/g
  const regex = new RegExp(`u-(${keys})-?\\d+`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function matchUnitDecimal(str) {
  const keys = unitValueKeys.join('|');

  const regex = new RegExp(`u-(${keys})-?\\d+d\\d+`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function matchUnitPercent(str) {
  const keys = unitValueKeys.join('|');

  const regex = new RegExp(`u-(${keys})-?\\d+p\\d?`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function matchUnitNone(str) {
  const keys = unitValueKeys.join('|');

  const regex = new RegExp(`u-(${keys})-?\\d+n`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function matchColor(str) {
  const keys = colorValueKeys.join('|');

  // /lux-(co|bg|bdc)[a-f|A-F|0-9]{3,6}/g
  const regex = new RegExp(`u-(${keys})[a-f|A-F|0-9]{3,6}`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function filter(str) {
  const unit = [
    ...matchUnit(str),
    ...matchUnitNone(str),
    ...matchUnitDecimal(str),
    ...matchUnitPercent(str),
  ];

  return {
    unit,
    enums: matchEnum(str),
    color: matchColor(str),
  };
}

module.exports = {
  filter,
};

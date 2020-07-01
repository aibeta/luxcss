const { enumValue, unitValue, colorValue } = require('../base');
const { unit } = require('../config');

function makeBaseList(uniqueBaseList: string[]) {
  return uniqueBaseList.map((d) => {
    const [key, value] = enumValue.d.split(':');
    return `@include lux("l-${d}", ${key}, ${value.split(';')[0]});`;
  });
}

interface unitKeyV {
  [name: string]: string[]
}

function makeUnitList(unitData: unitKeyV) {
  const obj = unitData;

  const unitList: string[] = [];
  // 排序，转化为字符串
  // 把 { lh: [150, 1d5, 100p, 1] }
  // 变为 { lh: '150px, 1.5, 100%, 1' }

  Object.keys(obj).forEach((k: string) => {
    const list: string[] = obj[k];

    // 15p
    list.forEach((cls) => {
      let value;

      if (cls.indexOf('d') > -1) value = cls.replace('d', '.');
      else if (cls.indexOf('p') > -1) value = cls.replace('p', '%');
      else if (cls.indexOf('n') > -1) value = cls.replace('n', '');
      else value = `${cls}${unit}`;

      unitList.push(`@include lux("u-${k}${cls}", ${unitValue[k]}, ${value});`);
    });
  });

  return unitList;
}

function makeColorList(colorData: unitKeyV) {
  const obj = colorData;

  const colorList: string[] = [];

  Object.keys(obj).forEach((k) => {

    const list: string[] = obj[k];

    list.forEach((cls) => {
      colorList.push(`@include lux("u-${k}${cls}", ${colorValue[k]}, #${cls});`);
    });
  });

  return colorList;
}


function makeLessTemplate(uniqueBaseList: string[], unitData: unitKeyV, colorData: unitKeyV) {
  const baseList = makeBaseList(uniqueBaseList).join('\n');

  const unitList = makeUnitList(unitData).join('\n');

  const colorList = makeColorList(colorData).join('\n');

  return `/* luxcss */
@mixin lux($name, $property, $value) {
  .#{$name} { #{$property}: #{$value}; }
}

${baseList}
${unitList}
${colorList}
`;
}

module.exports = {
  makeLessTemplate,
};

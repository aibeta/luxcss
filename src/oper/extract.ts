import { sort, isNumber} from '../../util/index';

const { colorValueKeys } = require('../base');

interface unitKey {
  [name: string]: string[]
}

export function extractEnum(baseList: string[]) {
  const filterdSet = new Set(baseList);
  const filterdList = [...filterdSet];
  console.log(filterdList);
  return filterdList.map(d => d.split('l-')[1]);
}

// 分离列表中的前缀和数值，eg: lux-mt20 => k:mt, v:20,30
export function extractUnit(unitList: string[]) {
  const filterdSet = new Set(unitList);
  const filterdList = [...filterdSet];
  const obj: unitKey = {};

  filterdList.forEach((word) => {
    const d = word.substring(2);

    const index = d.split('').findIndex((v) => {
      if (isNumber(v)) return true;
      if (v === '-') return true;
      return false;
    });

    const key = d.substring(0, index);
    const value = d.substring(index);

    const oldList = obj[key] || [];
    obj[key] = oldList.concat([value]);
  });

  return obj;
}

export function extractColor(colorList: string[]) {
  const filterdSet = new Set(colorList);
  const filterdList = [...filterdSet];
  const obj: unitKey = {};

  filterdList.forEach((d) => {
    const keys = colorValueKeys.join('|');
    const regrex = new RegExp(`(${keys})([a-f|A-F|0-9]{3,6})`);
    const result = d.match(regrex);

    if(result) {
      const key = result[1];
      const value = result[2];
  
      const oldList = obj[key] || [];
      obj[key] = oldList.concat([value]);
    }
  });

  // // 排序，转化为字符串
  // Object.keys(obj).forEach((k) => {
  //   const list = obj[k];
  //   // 加上引号
  //   obj[k] = sort(list).map(d => `${d}`).join(',');
  // });

  return obj;
}

export default {
  extractEnum,
  extractColor,
  extractUnit,
};

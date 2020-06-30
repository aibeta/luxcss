const fs = require('fs');
const less = require('less');

const { dist } = require('../../config');
const { read } = require('../oper/file')
const { makeLessTemplate } = require('../less.template');
const { sortString, sort, hms, diffDecreaseList } = require('../../util/index');
const { baseValue, unitValue, colorValue } = require('../base');
const baseValueKeys = Object.keys(baseValue);
const unitValueKeys = Object.keys(unitValue);
const colorValueKeys = Object.keys(colorValue);

let originBaseList = [];
let originUnitData = {};
let originColorData = {};


function diffBase(oringinList, list) {
  const changedDescList = [];
  const decreaseList = diffDecreaseList(oringinList, list);
  if (decreaseList.length > 0) {
    const desc = `减少基本样式: ${decreaseList.join(',')}`;
    changedDescList.push(desc);
  }

  const increaseList = diffDecreaseList(list, oringinList);

  if (increaseList.length > 0) {
    const desc = `增加基本样式: ${increaseList.join(',')}`;
    changedDescList.push(desc);
  }

  return changedDescList;
}

function diff(originData, data) {
  const unitKeys = Object.keys(data);
  const changedDescList = [];

  unitKeys.forEach((d) => {
    const originValueList = (originData[d] && originData[d].split(',')) || [];
    const valueList = data[d].split(',');

    const decreaseList = diffDecreaseList(originValueList, valueList);

    if (decreaseList.length > 0) {
      const desc = `减少${d}: ${decreaseList.join(',')}`;
      changedDescList.push(desc);
    }

    const increaseList = diffDecreaseList(valueList, originValueList);

    if (increaseList.length > 0) {
      const desc = `增加${d}: ${increaseList.join(',')}`;
      changedDescList.push(desc);
    }
  });

  return changedDescList;
}

async function main(filePathLists) {
  const { baseList, unitList, colorList } = await read(filePathLists);

  const uniqueBaseList = extractBase(baseList);

  const changedBaseDescList = diffBase(sortString(originBaseList), sortString(uniqueBaseList));

  const unitData = extractUnit(unitList);

  const changedUnitDescList = diff(originUnitData, unitData);

  const colorData = extractColor(colorList);

  const changedColorDescList = diff(originColorData, colorData);

  if (changedBaseDescList.length + changedUnitDescList.length + changedColorDescList.length === 0) {
    console.log('未检测到文件有样式更改');
    return;
  }

  if (changedBaseDescList.length > 0) console.log(changedBaseDescList);
  if (changedUnitDescList.length > 0) console.log(changedUnitDescList);
  if (changedColorDescList.length > 0) console.log(changedColorDescList);

  originBaseList = uniqueBaseList;
  originUnitData = unitData;
  originColorData = colorData;

  const styleFile = makeLessTemplate(uniqueBaseList, unitData, colorData);

  const output = await renderLess(styleFile);

  write(output.css, `${fileDistPath}`);

  const time = hms();
  console.log(`${time}: 写入成功`);
}

module.exports = {
  main,
  makeLessTemplate,
  renderLess,
};

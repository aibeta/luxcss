const fs = require('fs');
const less = require('less');

let originBaseList = [];
let originUnitData = {};
let originColorData = {};

const {
  fileLessPath, fileDistPath, compress,
} = require('./config');
const { makeLessTemplate } = require('./less.template');
const {
  sortString, sort, hms, diffDecreaseList,
} = require('../util/index');
const { baseValue, unitValue, colorValue } = require('./base');

const baseValueKeys = Object.keys(baseValue);
const unitValueKeys = Object.keys(unitValue);
const colorValueKeys = Object.keys(colorValue);

function write(str, filePath) {
  fs.writeFile(filePath, str, (err) => {
    if (err) {
      return console.error(err);
    }
    return null;
  });
}

// 去重
function extractBase(baseList) {
  const filterdSet = new Set(baseList);
  const filterdList = [...filterdSet];
  return filterdList.map(d => d.split('lux-')[1]);
}

// 分离列表中的前缀和数值，eg: lux-mt20 => k:mt, v:20,30
function extractUnit(unitList) {
  const filterdSet = new Set(unitList);
  const filterdList = [...filterdSet];
  const obj = {};

  filterdList.forEach((d) => {
    const keys = unitValueKeys.join('|');
    const regrex = new RegExp(`(p-|i-|d-)?(${keys})-?(\\d+)`);
    const result = d.match(regrex);

    let key = result[2];
    let value = result[3];

    // 处理负值
    if (result[0].indexOf('-') > -1) {
      value = Number.parseInt(`-${value}`, 10);
    }
    // 处理百分比
    if (result[0].indexOf('p-') > -1) {
      key = result[1] + result[2];
      value = Number(result[3]);
    }
    // 处理整数
    if (result[0].indexOf('i-') > -1) {
      key = result[1] + result[2];
      value = Number(result[3]);
    }
    // 处理小数
    if (result[0].indexOf('d-') > -1) {
      key = result[1] + result[2];
      value = Number(result[3]);
    }

    const oldList = obj[key] || [];
    obj[key] = oldList.concat([value]);
  });

  // 排序，转化为字符串
  Object.keys(obj).forEach((k) => {
    const list = obj[k];
    // 加上引号
    obj[k] = sort(list).join(',');
  });

  return obj;
}

function extractColor(colorList) {
  const filterdSet = new Set(colorList);
  const filterdList = [...filterdSet];
  const obj = {};
  filterdList.forEach((d) => {
    const keys = colorValueKeys.join('|');
    const regrex = new RegExp(`(${keys})([a-f|A-F|0-9]{3,6})`);
    const result = d.match(regrex);
    const key = result[1];
    const value = result[2];

    const oldList = obj[key] || [];
    obj[key] = oldList.concat([value]);
  });

  // 排序，转化为字符串
  Object.keys(obj).forEach((k) => {
    const list = obj[k];
    // 加上引号
    obj[k] = sort(list).map(d => `'${d}'`).join(',');
  });

  return obj;
}

function renderLess(lessStr) {
  return new Promise((resolve, reject) => {
    less.render(lessStr, {
      compress,
    }, (error, output) => {
      if (error) {
        console.log('less render 出错');
        reject(error);
        return null;
      }
      resolve(output);
      return null;
    });
  });
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      resolve(data.toString());
      return null;
    });
  });
}

function matchBase(str) {
  const keys = baseValueKeys.join('|');

  // /lux-(w|h|lh|minh|maxh|minw|maxw|br|mt|mr|mb|ml|pt|pr|pb|pl|fs|bdw)\d+/g
  const regex = new RegExp(`lux-(${keys})(\\s|'|")`, 'g');
  const result = str.match(regex);
  if (!result) return [];
  return result.map(d => d.substring(0, d.length - 1));
}

function matchUnit(str) {
  const keys = unitValueKeys.join('|');

  // /lux-(w|h|lh|minh|maxh|minw|maxw|br|mt|mr|mb|ml|pt|pr|pb|pl|fs|bdw)\d+/g
  const regex = new RegExp(`lux(p|d|i)?-(${keys})-?\\d+`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function matchColor(str) {
  const keys = colorValueKeys.join('|');

  // /lux-(co|bg|bdc)[a-f|A-F|0-9]{3,6}/g
  const regex = new RegExp(`lux-(${keys})[a-f|A-F|0-9]{3,6}`, 'g');
  const result = str.match(regex) || [];
  return result;
}

function read(file_path = []) {
  // 控制异步，可得到所有文件读取完毕
  return new Promise((resovle, reject) => {
    let pageLen = 0;
    let baseList = [];
    let unitList = [];
    let colorList = [];
    file_path.forEach((d) => {
      pageLen += 1;

      readFile(d).then((fileStr) => {
        pageLen -= 1;

        // 匹配所有 lux-d-f...
        const currentBaseList = matchBase(fileStr);
        // 匹配所有 lux-mt20...
        const currentUnitList = matchUnit(fileStr);
        // 匹配所有 lux-cfff...
        const currentColorList = matchColor(fileStr);
        // 存储每个页面和对应的列表

        baseList = [...baseList, ...currentBaseList];
        unitList = [...unitList, ...currentUnitList];
        colorList = [...colorList, ...currentColorList];
        // 所有文件读取完毕，进行数据处理
        if (pageLen === 0) {
          resovle({ baseList, unitList, colorList });
        }
        return null;
      }).catch((e) => {
        reject();
        console.log(e);
      });
    });
  });
}

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
  const lessFileStr = styleFile;

  const output = await renderLess(styleFile);

  if (fileLessPath) write(lessFileStr, `${fileLessPath}`);
  write(output.css, `${fileDistPath}`);

  const time = hms();
  console.log(`${time}: 写入成功`);
}

module.exports = {
  main,
  // extract,
  makeLessTemplate,
  renderLess,
};

const { read } = require('./file');
const { extractEnum, extractUnit, extractColor } = require('./extract');
const { makeLessTemplate } = require('./less.template');
const { renderSass, write } = require('./render');
const { hms } = require('../../util/index');
const { dist } = require('../config');

async function main(filePathLists) {
  const { enumList, unitList, colorList } = await read(filePathLists);

  const enums = extractEnum(enumList);
  const unit = extractUnit(unitList);
  const color = extractColor(colorList);

  const styleFile = makeLessTemplate(enums, unit, color);

  const output = await renderSass(styleFile);

  write(output.css, `${dist}`);

  const time = hms();
  console.log(`${time}: 写入成功`);
}

module.exports = {
  main,
};

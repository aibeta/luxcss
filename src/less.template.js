const config = require('./config');
const { baseValue, unitValue, colorValue } = require('./base');

const colorValueKeys = Object.keys(colorValue);

function makeBaseList(uniqueBaseList) {
  return uniqueBaseList.map(d => `.lux-${d} {
${baseValue[d]}
}`);
}

function makeValueList(style) {
  const keys = Object.keys(style);
  return keys.map(d => `@${d}: ${style[d]};`);
}

function makeFuncList(style) {
  const keys = Object.keys(style);
  const unitFuncList = keys.map((d) => {
    // 移除颜色的
    if (colorValueKeys.indexOf(d) > -1) {
      return '';
    }

    // 适配百分比
    if (d.indexOf('p-') > -1) {
      const k = d.replace('p-', '');
      return `.createPercent(luxp-${k}, ${unitValue[k]}, length(@${d}), @${d});`;
    }
    // 适配纯值
    if (d.indexOf('i-') > -1) {
      const k = d.replace('i-', '');
      return `.createInteger(luxi-${k}, ${unitValue[k]}, length(@${d}), @${d});`;
    }
    // 适配小数点
    if (d.indexOf('d-') > -1) {
      const k = d.replace('d-', '');
      return `.createDecimal(luxd-${k}, ${unitValue[k]}, length(@${d}), @${d});`;
    }

    return `.createNormal(lux-${d}, ${unitValue[d]}, length(@${d}), @${d});`;
  });


  const colorFuncList = colorValueKeys.map((d) => {
    if (style[d]) {
      return `.createColor(lux-${d}, ${colorValue[d]}, length(@${d}), @${d});`;
    }
    return '';
  });

  return unitFuncList.concat(colorFuncList);
}

function makeLessTemplate(uniqueBaseList, unitData, colorData) {
  const baseList = makeBaseList(uniqueBaseList).join('\n');
  const styleData = Object.assign({}, unitData, colorData);
  const valueList = makeValueList(styleData).filter(d => d !== '').join('\n');
  const funcList = makeFuncList(styleData).filter(d => d !== '').join('\n');

  return `/* luxcss */
.createNormal(@cls, @prop, @length, @list, @index: 1) when (@index =< @length) {
  @item: extract(@list, @index);
  .@{cls}@{item} {
    @{prop}: @item /${config.fileUnitDevidend || 1} * 1${config.fileUnit};
  }
  .createNormal(@cls, @prop, @length, @list, (@index + 1));
}
.createPercent(@cls, @prop, @length, @list, @index: 1) when (@index =< @length) {
  @item: extract(@list, @index);
  .@{cls}@{item} {
    @{prop}: percentage(@item / 100);
  }
  .createPercent(@cls, @prop, @length, @list, (@index + 1));
}
.createInteger(@cls, @prop, @length, @list, @index: 1) when (@index =< @length) {
  @item: extract(@list, @index);
  .@{cls}@{item} {
    @{prop}: @item;
  }
  .createInteger(@cls, @prop, @length, @list, (@index + 1));
}
.createDecimal(@cls, @prop, @length, @list, @index: 1) when (@index =< @length) {
  @item: extract(@list, @index);
  .@{cls}@{item} {
    @{prop}: (@item / 100);
  }
  .createDecimal(@cls, @prop, @length, @list, (@index + 1));
}
.createColor(@cls, @prop, @length,@list,@index: 1) when (@index =< @length) {
  @it: escape(extract(@list, @index));
  @item: escape(@it);
  .@{cls}@{item} {
    @{prop}: color('#@{item}');
  }
  .createColor(@cls, @prop, @length, @list, (@index + 1));
}

${baseList}

${valueList}

${funcList}
`;
}

module.exports = {
  makeLessTemplate,
};

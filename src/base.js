const Background = require('./cheat/Background.js');
const Border = require('./cheat/Border.js');
const BoxSizing = require('./cheat/BoxSizing.js');
const Font = require('./cheat/Font.js');
const Generatedcontent = require('./cheat/Generatedcontent.js');
const Lists = require('./cheat/Lists.js');
const MarginPadding = require('./cheat/MarginPadding.js');
const Others = require('./cheat/Others.js');
const Outline = require('./cheat/Outline.js');
const Print = require('./cheat/Print.js');
const Tables = require('./cheat/Tables.js');
const Text = require('./cheat/Text.js');
const VisualFormatting = require('./cheat/VisualFormatting.js');

const userValue = {
  center: 'display: flex; align-items: center;justify-content: center;',
  'bdts-s': 'border-top-style: solid;',
  'bdbs-s': 'border-bottom-style: solid;',
  'bdls-s': 'border-left-style: solid;',
  'bdrs-s': 'border-right-style: solid;',
};

const baseValue = Object.assign({},
  userValue,
  VisualFormatting,
  Background,
  Border,
  BoxSizing,
  Font,
  Generatedcontent,
  Lists,
  MarginPadding,
  Others,
  Outline,
  Print,
  Tables,
  Text);

const unitValue = {
  fx: 'flex',
  fw: 'font-weight',
  z: 'z-index',
  op: 'opacity',
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  w: 'width',
  h: 'height',
  lh: 'line-height',
  mih: 'min-height',
  mah: 'max-height',
  miw: 'min-width',
  maw: 'max-width',
  bdrs: 'border-radius',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  fz: 'font-size',
  ti: 'text-indent',
  bdw: 'border-width',
  bdtw: 'border-top-width',
  bdbw: 'border-bottom-width',
  bdlw: 'border-left-width',
  bdrw: 'border-right-width',
  bdtrrs: 'border-top-right-radius',
  bdtlrs: 'border-top-left-radius',
  bdbrrs: 'border-bottom-right-radius',
  bdblrs: 'border-bottom-left-radius',
};

const colorValue = {
  c: 'color',
  bgc: 'background-color',
  bdc: 'border-color',
  bdtc: 'border-top-color',
  bdbc: 'border-bottom-color',
  bdlc: 'border-left-color',
  bdrc: 'border-right-color',
};

module.exports = {
  baseValue,
  unitValue,
  colorValue,
};

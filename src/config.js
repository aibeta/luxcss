const config = {
  fileUnit: 'px',
  fileUnitDevidend: 1,
  fileSrcPath: [
    `${__dirname}/example/index.html`],
  // fileLessPath 可选, 存在则输出 less 源文件
  fileLessPath: `${__dirname}/example/lux.less`,
  fileDistPath: `${__dirname}/example/lux.css`,
  compress: false,
};

module.exports = config;

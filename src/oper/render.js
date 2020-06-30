const sass = require('sass');
const fs = require('fs');

function write(str, filePath) {
  fs.writeFile(filePath, str, (err) => {
    if (err) {
      return console.error(err);
    }
    return null;
  });
}

function renderSass(sassStr) {
  return new Promise((resolve, reject) => {
    sass.render({ data: sassStr }, (error, output) => {
      if (error) {
        console.log('sass render 出错');
        reject(error);
        return null;
      }
      resolve(output);
      return null;
    });
  });
}

module.exports = {
  write,
  renderSass,
};

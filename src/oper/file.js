const fs = require('fs');
const { filter } = require('./match');

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


function read(file_path = []) {
  // 控制异步，可得到所有文件读取完毕
  return new Promise((resovle, reject) => {
    let pageLen = 0;
    let enumList = [];
    let unitList = [];
    let colorList = [];
    file_path.forEach((d) => {
      pageLen += 1;

      readFile(d).then((fileStr) => {
        pageLen -= 1;

        const { enums, unit, color } = filter(fileStr);

        // 存储每个页面和对应的列表
        enumList = [...enumList, ...enums];
        unitList = [...unitList, ...unit];
        colorList = [...colorList, ...color];
        // 所有文件读取完毕，进行数据处理
        if (pageLen === 0) {
          resovle({ enumList, unitList, colorList });
        }
      }).catch((e) => {
        console.log(e);
        reject();
      });
    });
  });
}

module.exports = {
  read,
};

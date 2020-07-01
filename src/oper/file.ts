const fs = require('fs');
const sass = require('sass');
import { filter } from './match';

// path: /a/b or a/b/c.md
type Path = string
// absolte path of a file or directory
type FullPaths = Path[]

interface result {
  enumList: string[],
  unitList: string[],
  colorList: string[],
}

function readFile(filePath: Path): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err: any, data: any) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      resolve(data.toString());
    });
  });
}

export function read(file_path: FullPaths = []): Promise<result> {
  // 控制异步，可得到所有文件读取完毕
  return new Promise((resovle, reject) => {
    let pageLen = 0;
    let enumList: string[] = [];
    let unitList: string[] = [];
    let colorList: string[] = [];
    file_path.forEach((d) => {
      pageLen += 1;

      readFile(d).then((fileStr: string) => {
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

export function write(content: string, full_path: Path) {
  fs.writeFile(full_path, content, (err: any) => {
    if (err) {
      return console.error(err);
    }
  });
}

export function renderSass(content: string): Promise<any> {
  return new Promise((resolve, reject) => {
    sass.render({ data: content }, (error: any, output: any) => {
      if (error) {
        console.log('sass render 出错');
        reject(error);
      }
      resolve(output);
    });
  });
}

export default {
  read,
  write,
  renderSass,
}
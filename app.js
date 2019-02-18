const chokidar = require('chokidar');
const fs = require('fs');
const { hms } = require('./util/index');

const { fileSrcPath } = require('./src/config');
const { main } = require('./src/lux');

function findpath(path) {
  // eg path = '/Users/dayu/Desktop/miniprogram/pages/[name]/[name].wxml';
  // 传入的不是一个目录
  if (path.split('[name]').length === 1) {
    return [path];
  }

  // 文件目录
  const directory = path.split('[name]')[0];

  // 获取目录下所有文件夹的名称
  const list = fs.readdirSync(directory);
  // 过滤掉以.开头的隐藏文件
  const routeNames = list.filter(item => !(/(^|\/)\.[^/.]/g).test(item));
  // 获取目录下所有符合 [name]/[name].suffix 的绝对路径的列表
  return routeNames.map((name) => {
    // 防止拿到的 file 而不是 route
    if (name.indexOf('.') > -1) {
      // eslint-disable-next-line
      name = name.split('.')[0];
    }
    const realRoute = path.replace(/\[name\]/g, name);
    return realRoute;
  });
}

let paths = [];
fileSrcPath.forEach((d) => {
  const list = findpath(d);
  paths = [...paths, ...list];
});

const watcher = chokidar.watch(paths, {
  persistent: true,
});

watcher.on('change', (path) => {
  const time = hms();
  const splitList = path.split('/');
  const fileName = splitList[splitList.length - 1];

  // 清屏
  process.stdout.write('\x1Bc');
  console.log(`${time}, 检测到文件保存, ${fileName}`);

  main(paths);
});

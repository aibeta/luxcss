const chokidar = require('chokidar');
const path = require('path');
const { readdir } = require('fs').promises;
const { hms } = require('./util/index');
const { root, dist } = require('./src/config');
const { main } = require('./src/oper/main');
const distPath = path.join(__dirname, dist);

// recursively find all files inside root
async function getFiles(dir) {
  const directorys = await readdir(dir, { withFileTypes: true });

  const files = await Promise.all(directorys.map((directory) => {
    const res = path.resolve(dir, directory.name);

    return directory.isDirectory() ? getFiles(res) : res;
  }));

  return files.flat();
}

function watch(paths) {
  const watcher = chokidar.watch(paths, {
    persistent: true,
  });

  watcher.on('change', (filePath) => {
    const time = hms();
    const splitList = filePath.split('/');
    const fileName = splitList[splitList.length - 1];

    if (filePath === distPath) return;

    // clear screen
    process.stdout.write('\x1Bc');
    console.log(`${time}, file saved, ${fileName}`);

    main(paths);
  });
}

async function runApp() {
  const files = await getFiles(root);

  console.log(files)

  watch(files);
}

runApp();

import { hms } from "../util/index";
import { read, renderSass, write } from './oper/file';
const path = require('path');
const { root, dist } = require('./config');
const chokidar = require('chokidar');
const { readdir } = require('fs').promises;

const { extractEnum, extractUnit, extractColor } = require('./oper/extract');
const { makeLessTemplate } = require('./oper/sass.template');

const distPath = path.join(__dirname, dist);

// path: /a/b
type Path = string
// absolte path of a file or directory
type FullPaths = Path[]

type Dirent = any

// recursively find all files' full paths inside root
async function getFullPaths(root: Path): Promise<FullPaths> {
  const directoryAndFiles = await readdir(root, { withFileTypes: true });

  const files: any[] = await Promise.all(directoryAndFiles.map((directory: Dirent) => {

    const full_path = path.resolve(root, directory.name)

    if(directory.isDirectory()) return getFullPaths(full_path)

    return full_path;
  }));

  return files.flat();
}

async function main(filePathLists: FullPaths) {
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

function watch(paths: FullPaths) {
  const watcher = chokidar.watch(paths, {
    persistent: true,
  });

  watcher.on('change', (filePath: string) => {
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
  const full_paths = await getFullPaths(root);

  console.log(full_paths)

  watch(full_paths);
}

runApp();

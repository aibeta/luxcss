const chokidar = require('chokidar');
const path = require('path');
const { readdir } = require('fs').promises;
// const { hms } = require('../util/index.ts');
const { root, dist } = require('./config');
const { main } = require('./oper/main');
const distPath = path.join(__dirname, dist);

import { hms } from "../util/index";

// define
// file: /a/b/c.md 
type File = string
type Files = File[]
// filename: c.md
type FileName= string
// path: /a/b
type Path = string
// absolte path of a file or directory
type FullPaths = Path[]

type Dirent = any

// recursively find all files' full paths inside root
async function getFullPaths(root: Path): Promise<FullPaths[]> {
  const directoryAndFiles = await readdir(root, { withFileTypes: true });

  const files: any[] = await Promise.all(directoryAndFiles.map((directory: Dirent) => {

    const full_path = path.resolve(root, directory.name)

    if(directory.isDirectory()) return getFullPaths(full_path)

    return full_path;
  }));

  return files.flat();
}

function watch(paths: FullPaths[]) {
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

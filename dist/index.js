"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chokidar = require('chokidar');
const path = require('path');
const { readdir } = require('fs').promises;
const { hms } = require('../util/index.ts');
const { root, dist } = require('./config');
const { main } = require('./oper/main');
const distPath = path.join(__dirname, dist);
// recursively find all files' full paths inside root
function getFullPaths(root) {
    return __awaiter(this, void 0, void 0, function* () {
        const directoryAndFiles = yield readdir(root, { withFileTypes: true });
        const files = yield Promise.all(directoryAndFiles.map((directory) => {
            const full_path = path.resolve(root, directory.name);
            if (directory.isDirectory())
                return getFullPaths(full_path);
            return full_path;
        }));
        return files.flat();
    });
}
function watch(paths) {
    const watcher = chokidar.watch(paths, {
        persistent: true,
    });
    watcher.on('change', (filePath) => {
        const time = hms();
        const splitList = filePath.split('/');
        const fileName = splitList[splitList.length - 1];
        if (filePath === distPath)
            return;
        // clear screen
        process.stdout.write('\x1Bc');
        console.log(`${time}, file saved, ${fileName}`);
        main(paths);
    });
}
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const full_paths = yield getFullPaths(root);
        console.log(full_paths);
        watch(full_paths);
    });
}
runApp();
//# sourceMappingURL=index.js.map
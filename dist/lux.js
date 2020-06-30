var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("util/index", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function sortString(array) {
        return array.sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0; // default return value (no sorting)
        });
    }
    exports_1("sortString", sortString);
    function sort(array) {
        return array.sort((a, b) => a - b);
    }
    exports_1("sort", sort);
    function padZero(v) {
        return v < 10 ? `0${v}` : `{v}`;
    }
    exports_1("padZero", padZero);
    function hms() {
        const date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
    }
    exports_1("hms", hms);
    // list1 中有的元素，list2中没有的元素
    function diffDecreaseList(list1 = [], list2 = []) {
        const decreaseList = [];
        list1.forEach((d) => {
            const index = list2.indexOf(d);
            if (index < 0)
                decreaseList.push(d);
        });
        return decreaseList;
    }
    exports_1("diffDecreaseList", diffDecreaseList);
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                sortString,
                sort,
                hms,
                diffDecreaseList,
            });
        }
    };
});
System.register("src/index", ["util/index"], function (exports_2, context_2) {
    "use strict";
    var chokidar, path, readdir, _a, root, dist, main, distPath, index_1;
    var __moduleName = context_2 && context_2.id;
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
            const time = index_1.hms();
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
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            chokidar = require('chokidar');
            path = require('path');
            readdir = require('fs').promises.readdir;
            // const { hms } = require('../util/index.ts');
            _a = require('./config'), root = _a.root, dist = _a.dist;
            main = require('./oper/main').main;
            distPath = path.join(__dirname, dist);
            runApp();
        }
    };
});
//# sourceMappingURL=lux.js.map
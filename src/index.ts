import * as path from 'path';
import { promises as fs } from 'fs';
import { hms } from '../util/index';
import { read, renderSass, write } from './oper/file';
import { extractEnum, extractUnit, extractColor } from './oper/extract';
import { makeLessTemplate } from './oper/sass.template';

const defaultConfig = require('./config');

// path: /a/b
type Path = string;
// absolute path of a file or directory
type FullPaths = Path[];
type Dirent = any;

export interface LuxConfig {
  root: string;
  dist: string;
}

export interface ResolvedLuxConfig {
  rootPath: string;
  distPath: string;
}

export interface BuildOptions {
  cwd?: string;
  log?: boolean;
}

export interface BuildResult extends ResolvedLuxConfig {
  files: FullPaths;
  css: string;
}

export const watchDebounceMs = 80;
export const supportedExtensions = new Set([
  '.html',
  '.htm',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.vue',
  '.svelte',
  '.md',
  '.css',
  '.scss',
  '.sass',
  '.less',
]);
export const ignoredDirectoryNames = new Set(['.git', 'node_modules', 'dist']);

export function resolveConfig(config: LuxConfig = defaultConfig, cwd = process.cwd()): ResolvedLuxConfig {
  return {
    rootPath: path.resolve(cwd, config.root),
    distPath: path.resolve(cwd, config.dist),
  };
}

export function isIgnoredDirectory(name: string): boolean {
  return ignoredDirectoryNames.has(name) || name.startsWith('.');
}

export function isSupportedFile(fullPath: Path, distPath: Path): boolean {
  if (path.resolve(fullPath) === path.resolve(distPath)) return false;
  return supportedExtensions.has(path.extname(fullPath));
}

export function isIgnoredWatchedPath(watchedPath: Path, rootPath: Path, distPath: Path): boolean {
  const fullPath = path.resolve(watchedPath);
  if (fullPath === path.resolve(distPath)) return true;

  const relativePath = path.relative(rootPath, fullPath);
  if (!relativePath || relativePath.startsWith('..')) return false;

  return relativePath.split(path.sep).some((part) => isIgnoredDirectory(part));
}

// Recursively find supported files' full paths inside root.
export async function getFullPaths(directoryPath: Path, distPath: Path): Promise<FullPaths> {
  const directoryAndFiles = await fs.readdir(directoryPath, { withFileTypes: true });

  const files: FullPaths[] = await Promise.all(directoryAndFiles.map((directory: Dirent) => {
    const fullPath = path.resolve(directoryPath, directory.name);

    if (directory.isDirectory()) {
      if (isIgnoredDirectory(directory.name)) return [];
      return getFullPaths(fullPath, distPath);
    }

    if (!directory.isFile() || !isSupportedFile(fullPath, distPath)) return [];
    return [fullPath];
  }));

  return files.flat().sort((a, b) => a.localeCompare(b));
}

export async function generateCssFromFiles(filePathLists: FullPaths): Promise<string> {
  const { enumList, unitList, colorList } = await read(filePathLists);

  const enums = extractEnum(enumList);
  const unit = extractUnit(unitList);
  const color = extractColor(colorList);

  const styleFile = makeLessTemplate(enums, unit, color);
  return renderSass(styleFile);
}

export async function buildProject(config: LuxConfig = defaultConfig, options: BuildOptions = {}): Promise<BuildResult> {
  const { rootPath, distPath } = resolveConfig(config, options.cwd);
  const files = await getFullPaths(rootPath, distPath);
  const css = await generateCssFromFiles(files);

  await write(css, distPath);

  if (options.log !== false) {
    console.log(`${hms()}: wrote ${distPath} (${files.length} files scanned)`);
  }

  return {
    rootPath,
    distPath,
    files,
    css,
  };
}

function scheduleBuild(config: LuxConfig, options: BuildOptions) {
  let timer: NodeJS.Timeout | undefined;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      buildProject(config, options).catch((error) => {
        console.error(`${hms()}: build failed`);
        console.error(error);
      });
    }, watchDebounceMs);
  };
}

export async function watchProject(config: LuxConfig = defaultConfig, options: BuildOptions = {}): Promise<any> {
  const { rootPath, distPath } = resolveConfig(config, options.cwd);

  await buildProject(config, options);

  const { watch } = await import('chokidar');
  const rebuild = scheduleBuild(config, options);
  const watcher = watch(rootPath, {
    ignored: (watchedPath: string) => isIgnoredWatchedPath(watchedPath, rootPath, distPath),
    ignoreInitial: true,
    persistent: true,
  });

  watcher
    .on('add', rebuild)
    .on('change', rebuild)
    .on('unlink', rebuild)
    .on('error', (error: unknown) => {
      console.error(`${hms()}: watcher error`);
      console.error(error);
    });

  if (options.log !== false) {
    console.log(`${hms()}: watching ${rootPath}`);
  }

  return watcher;
}

export async function runApp(): Promise<void> {
  await watchProject(defaultConfig);
}

if (require.main === module) {
  runApp().catch((error) => {
    console.error(`${hms()}: startup failed`);
    console.error(error);
    process.exitCode = 1;
  });
}

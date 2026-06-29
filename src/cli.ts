#!/usr/bin/env node

import { buildProject, LuxConfig, watchProject } from './index';
import { loadConfig } from './config-loader';

const defaultConfig = require('./config');

interface CliOptions {
  configPath?: string;
  root?: string;
  dist?: string;
  watch: boolean;
  help: boolean;
}

function printHelp(): void {
  console.log(`luxcss

Usage:
  luxcss [options]

Options:
  -c, --config <file>  Load a config file. Defaults to lux.config.js or luxcss.config.js if present.
  -w, --watch          Build once and keep watching for changes.
      --root <dir>     Override the source root directory.
      --dist <file>    Override the CSS output file.
  -h, --help           Show this help message.

Examples:
  luxcss --root src --dist dist/lux.css
  luxcss --config lux.config.js --watch
`);
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    watch: false,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    switch (arg) {
      case '-c':
      case '--config':
        options.configPath = args[index + 1];
        index += 1;
        break;
      case '-w':
      case '--watch':
        options.watch = true;
        break;
      case '--root':
        options.root = args[index + 1];
        index += 1;
        break;
      case '--dist':
        options.dist = args[index + 1];
        index += 1;
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

export async function runCli(args = process.argv.slice(2), cwd = process.cwd()): Promise<void> {
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  const fileConfig = loadConfig({ cwd, configPath: options.configPath }, defaultConfig);
  const config: LuxConfig = {
    ...fileConfig,
    ...(options.root ? { root: options.root } : {}),
    ...(options.dist ? { dist: options.dist } : {}),
  };

  if (options.watch) {
    await watchProject(config, { cwd });
    return;
  }

  await buildProject(config, { cwd });
}

if (require.main === module) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

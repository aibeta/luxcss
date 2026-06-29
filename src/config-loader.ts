import * as fs from 'fs';
import * as path from 'path';
import type { LuxConfig } from './index';

export const defaultConfigFileNames = [
  'lux.config.js',
  'luxcss.config.js',
];

export function findConfigFile(cwd = process.cwd(), fileNames = defaultConfigFileNames): string | undefined {
  for (const fileName of fileNames) {
    const fullPath = path.resolve(cwd, fileName);
    if (fs.existsSync(fullPath)) return fullPath;
  }

  return undefined;
}

export function loadConfigFromFile(configPath: string): Partial<LuxConfig> {
  const fullPath = path.resolve(configPath);
  // Keep CommonJS loading for now because the project itself compiles to CommonJS.
  // Delete the require cache so tests and repeated CLI runs can reload changed config.
  delete require.cache[require.resolve(fullPath)];
  const loadedConfig = require(fullPath);
  return loadedConfig.default || loadedConfig;
}

export function normalizeConfig(config: Partial<LuxConfig>, fallback: LuxConfig): LuxConfig {
  return {
    root: config.root || fallback.root,
    dist: config.dist || fallback.dist,
  };
}

export function loadConfig(options: { cwd?: string; configPath?: string }, fallback: LuxConfig): LuxConfig {
  const cwd = options.cwd || process.cwd();
  const configPath = options.configPath
    ? path.resolve(cwd, options.configPath)
    : findConfigFile(cwd);

  if (!configPath) return fallback;

  const loadedConfig = loadConfigFromFile(configPath);
  return normalizeConfig(loadedConfig, fallback);
}

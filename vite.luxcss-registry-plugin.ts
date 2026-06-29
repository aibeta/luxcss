import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import * as path from 'path';
import type { Plugin } from 'vite';

const virtualModuleId = 'virtual:luxcss-registry';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.resolve(__dirname, 'src/base.js');

export function luxcssRegistryPlugin(): Plugin {
  return {
    name: 'luxcss-registry',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
      return undefined;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return undefined;

      this.addWatchFile(basePath);
      const require = createRequire(import.meta.url);
      delete require.cache[require.resolve(basePath)];
      const base = require(basePath);

      return `
export const enumValue = ${JSON.stringify(base.enumValue, null, 2)};
export const unitValue = ${JSON.stringify(base.unitValue, null, 2)};
export const colorValue = ${JSON.stringify(base.colorValue, null, 2)};
export const enumValueKeys = Object.keys(enumValue);
export const unitValueKeys = Object.keys(unitValue);
export const colorValueKeys = Object.keys(colorValue);
export default { enumValue, unitValue, colorValue, enumValueKeys, unitValueKeys, colorValueKeys };
`;
    },
  };
}

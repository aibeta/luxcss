import { defineConfig } from 'vite';
import { luxcssRegistryPlugin } from './vite.luxcss-registry-plugin';

export default defineConfig({
  root: 'playground',
  plugins: [luxcssRegistryPlugin()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../dist-playground',
    emptyOutDir: true,
  },
});

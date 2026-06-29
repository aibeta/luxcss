import { defineConfig } from 'vitest/config';
import { luxcssRegistryPlugin } from './vite.luxcss-registry-plugin';

export default defineConfig({
  plugins: [luxcssRegistryPlugin()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'playground/src/**/*.test.ts'],
    restoreMocks: true,
    clearMocks: true,
  },
});

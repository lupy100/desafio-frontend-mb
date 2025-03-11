import { fileURLToPath, URL } from 'node:url';

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config.d.ts';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  })
);

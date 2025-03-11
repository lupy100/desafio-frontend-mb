import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/base' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
  },
});

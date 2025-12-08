import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [],
});
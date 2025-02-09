import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  plugins: [pluginReact()],
  html: {
    title: 'Notebook',
    favicon: 'src/favicon.svg',
  },
  server: {
    proxy: {
      // http://localhost:3030/api -> http://localhost:3000/
      // http://localhost:3030/api/foo -> http://localhost:3000/foo
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
});

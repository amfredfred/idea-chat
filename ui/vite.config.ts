import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@src', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
});

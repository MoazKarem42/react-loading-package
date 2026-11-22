import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'react-loading-kit/styles.css': fileURLToPath(new URL('../src/styles/index.css', import.meta.url)),
      'react-loading-kit': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5173,
    open: false,
    fs: {
      allow: ['..'],
    },
  },
});

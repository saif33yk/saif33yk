import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../public',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/templates/pages/home.html'),
        admin: resolve(__dirname, 'src/templates/pages/admin.html')
      }
    }
  },
  server: {
    port: 3000
  }
});

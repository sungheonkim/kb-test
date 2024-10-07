import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: false, // CSS 소스맵 비활성화
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
        'firebase-messaging-sw': resolve(__dirname, 'src/firebase-messaging-sw.js')
      }
    }
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/'
    }
  }
});

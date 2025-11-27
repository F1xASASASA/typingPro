import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Когда мы стучимся на /yandex-api, Vite перенаправляет это на реальный адрес Яндекса
      '/yandex-api': {
        target: 'https://rest-assistant.api.cloud.yandex.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/yandex-api/, ''),
        secure: false, // Иногда нужно для https
      },
    },
  },
});
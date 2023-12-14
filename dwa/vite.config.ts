import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      target: ['chrome109', 'edge112', 'firefox102', 'safari15.6', 'ios15.6']
    },
    define: {
      global: 'globalThis'
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          "name": "Comitia Help",
          "short_name": "Comitia",
          "icons": [
            {
              "src": "/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/android-chrome-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ],
          "theme_color": "#0f172a",
          "background_color": "#f1f5f9",
          "display": "standalone"
        },
        devOptions: {
          enabled: command === 'serve' ? true : false
        }
      }),
      nodePolyfills()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});

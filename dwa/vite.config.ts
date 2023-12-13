import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import path from "path";
import  nodePolyfills from "vite-plugin-node-stdlib-browser"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ['chrome109', 'edge112', 'firefox102', 'safari15.6', 'ios15.6']
  },
  define: {
    global: 'globalThis'
  },
  plugins: [react(), VitePWA(
      {
        registerType: 'autoUpdate',
        manifest: {
          icons: [
            {
              src: "/comitia-logo.jpg",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        },
        devOptions: {
          enabled: true
        }
      }
  ), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

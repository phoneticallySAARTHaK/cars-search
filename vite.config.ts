import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      filename: "sw.ts",
      srcDir: "src/",
      outDir: "dist/",
      registerType: "autoUpdate",
      injectRegister: "inline",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,json}"],
      },
      manifest: null,
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/index.html",
        resolveTempFolder() {
          return "dist";
        },
      },
    }),
  ],
});

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from 'vite-plugin-solid-svg'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solidPlugin(), solidSvg()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}));

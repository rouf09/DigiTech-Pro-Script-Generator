// digitechpro-scriptgen-electron/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",                      // ✅ file:// এর জন্য relative paths
  build: { outDir: "dist-renderer", assetsDir: "assets" },
  plugins: [react()],
});

import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteReact(), tsConfigPaths()],
  build: {
    outDir: "./build",
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
});

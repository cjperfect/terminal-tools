import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "api",
      enable: true,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx"],
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  optimizeDeps: {
    include: ["xtend"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:4000", // 仅在开发环境下生效
    },
  },
});

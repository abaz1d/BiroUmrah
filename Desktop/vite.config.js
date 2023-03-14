import { fileURLToPath, URL } from "node:url";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "tailwindcss";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  //base: command === "build" ? "https://abadan-company.com/" : "/",
  //base: "https://abadan-company.com/",
  //base: resolve("https://abadan-company.com/", "./dist/"),
  plugins: [/*basicSsl(),*/ tailwindcss, vue({}), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   port: 8000, https://abadan-company.com/
  // },
  // build: {
  //   brotliSize: false,
  //   manifest: false,
  //   minify: mode === "development" ? false : "terser",
  //   outDir: "dist",
  //   sourcemap: command === "serve" ? "inline" : false,

  //   rollupOptions: {
  //     output: {
  //       assetFileNames: "clientlib-site/resources/[ext]/[name][extname]",
  //       chunkFileNames: "clientlib-site/resources/chunks/[name].[hash].js",
  //       entryFileNames: "clientlib-site/resources/js/[name].js",
  //     },
  //   },
  // },
}));

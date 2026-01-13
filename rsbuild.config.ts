import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
  plugins: [pluginPreact()],
  html: {
    template: "./public/index.html",
  },
  // ==========
  output: {
    filename: {
      js: "[name].js",
      css: "[name].css",
    },
  },
  // ==========
});

import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';

export default defineConfig({
  plugins: [pluginPreact()],
  html: {
    template: './public/index.html',
  },
  output: {
    // Inline JS files directly into HTML
    inlineScripts: true,
    // Inline CSS files directly into HTML
    inlineStyles: true,
    // Increase data URI limit to inline more assets
    dataUriLimit: {
      // Inline all assets up to 10MB (10485760 bytes)
      // This will inline larger images and other assets into the HTML
      svg: 10485760,
      font: 10485760,
      image: 10485760,
    },
  },
});

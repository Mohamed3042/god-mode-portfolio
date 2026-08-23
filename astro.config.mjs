// @ts-check
import { defineConfig } from 'astro/config';

// God Mode Portfolio — deployed to GitHub Pages (project site).
// Live URL: https://mohamed3042.github.io/god-mode-portfolio/
export default defineConfig({
  site: 'https://mohamed3042.github.io',
  base: '/god-mode-portfolio',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});

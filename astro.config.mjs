// @ts-check
import { defineConfig } from 'astro/config';

// God Mode Portfolio — deployed to GitHub Pages (project site).
// Live URL: https://engineeringprojectswork-droid.github.io/god-mode-portfolio/
export default defineConfig({
  site: 'https://engineeringprojectswork-droid.github.io',
  base: '/god-mode-portfolio',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});

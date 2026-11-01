import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// User site repository (`hasti-alitab.github.io`) is served from the domain root,
// so no `base` is needed. If you deploy to a project repo instead, set
// base: '/<repo-name>' and keep every internal link through `url()` in src/lib/url.ts.
// For a custom domain later, change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://hasti-alitab.github.io',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' }, // no render-blocking CSS requests
  integrations: [sitemap(), mdx()],
});

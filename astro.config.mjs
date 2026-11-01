import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Site URL and base path are derived from the GitHub repository during CI
// (GITHUB_REPOSITORY = "<owner>/<repo>"), so the same code works for:
//   - a user site, repo named "<owner>.github.io"  -> https://<owner>.github.io/
//   - a project site, any other repo name           -> https://<owner>.github.io/<repo>/
// Locally (no env var) the site is served from the root.
// For a custom domain: set SITE_URL (e.g. https://www.example.org) and BASE_PATH=/ in the workflow and add public/CNAME.
const [owner = 'hastialitab', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = !repo || repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const site = process.env.SITE_URL ?? `https://${owner.toLowerCase()}.github.io`;
const base = process.env.BASE_PATH ?? (isUserSite ? '/' : `/${repo}`);

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' }, // no render-blocking CSS requests
  integrations: [sitemap(), mdx()],
});

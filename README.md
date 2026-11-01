# Hasti Alitab — Academic Archaeological Atlas

Static academic portfolio built with **Astro 7**, TypeScript, plain CSS design tokens, **Leaflet** (Fieldwork Atlas) and **Lucide** icons. Deployed to GitHub Pages by GitHub Actions.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
```

Requires Node 22 or newer.

## Performance (slow connections)

- Zero render-blocking requests: CSS is inlined, fonts are self-hosted latin-only WOFF2 with `font-display: swap` (the two main ones preloaded).
- Images: `npm run build` first runs `scripts/optimize-images.mjs`, which writes responsive WebP variants next to each JPG/PNG in `public/images/` (originals untouched; the variants are git-ignored). Use `<Picture>` for new content images and list the variant widths that exist (400, 640, 800, 1200; never above the source width).
- The Leaflet map (about 150 KB plus tiles) loads only when scrolled near. With Data Saver on, or a 2G connection, it waits for a "Load interactive map" button. Every site is also listed as plain text below the map.
- Home page: roughly 160 KB transferred. Lighthouse (mobile, simulated slow 4G): 95–100 performance (the Atlas page is lowest because of its map tiles), 100 accessibility and SEO on all pages checked, 96–100 best practices (the 96 is Esri's 256px map tiles).

## Checks

```bash
npm run check        # TypeScript / Astro diagnostics
npm run build && npm run preview -- --port 4400
npm run check:links  # crawls the served site: links, #anchors, images, srcset, titles, h1, sitemap
```

## Structure

| Path | Purpose |
|---|---|
| `src/pages/` | Routes: `/`, `/about/`, `/research/`, `/fieldwork/`, `/fieldwork/<slug>/`, `/fieldwork/atlas/`, `/publications/`, `/teaching/`, `/cv/`, `/contact/` |
| `src/components/` | Navbar, Footer, Hero, SectionHeading, ResearchCard, FieldworkCard, PublicationCard, Timeline, SkillGroup, InteractiveMap, ImageGallery, CVDownloadButton, Breadcrumbs, ImagePlaceholder |
| `src/content/fieldwork/*.md` | One Markdown file per mission (frontmatter + description) |
| `src/data/*.ts` | Site config, research themes, publications, teaching, CV |
| `src/styles/global.css` | Design tokens (colours, fonts, spacing) and shared styles |
| `public/images/` | Image assets (see below) |

## Content editing

- **Contact email, navigation, profile links:** `src/data/site.ts`. The public email is the Gmail address from the CV; the university address and phone number are intentionally not published. Add ORCID / Scholar / Academia links to `profiles` and they appear on the Contact page.
- **New publication:** add an object to `src/data/publications.ts`. It is grouped by `type` automatically.
- **Fieldwork entry:** edit or add a file in `src/content/fieldwork/`. Required frontmatter is defined in `src/content.config.ts`.
- **Map markers:** come from each entry's `coordinates`. Remove the `coordinates` block to leave a site "location pending". Current coordinates are **deliberately generalised to 0.1° (~10 km)** to avoid exposing precise archaeological locations. The Ultan Citadel position rests on a single gazetteer source (GeoNames); Nishapur and Firouzabad use the modern town positions. Check these with Hasti before publishing.
- **Research themes:** `src/data/research.ts`. Sistan is described as current MA research only — the CV does not support any completed project or publication.

## Asset replacement guide

No personal fieldwork photographs exist yet, so the site uses clearly labelled illustrative placeholders. Nothing needs changing in page layouts to add real images.

- `public/images/portrait/hasti-portrait.jpg` — About page portrait and default social-share image.
- `public/images/publications/bibliography-cover.jpg` — book cover.
- `public/images/landscapes/` — satellite, terrain and landscape imagery. To replace the illustrative hero, pass `image={{ src, alt, credit }}` to `<Hero />` in `src/pages/index.astro`.
- `public/images/archaeological-sites/<slug>/` — site photographs. List them in that site's `gallery` frontmatter with `src`, `alt`, `credit` and `kind`:
  - `personal` — taken by Hasti during her own fieldwork,
  - `documentary` — licensed images from other sources (always give licence and credit; never imply Hasti took them),
  - `illustrative` — generic or decorative imagery.
- `public/images/maps/` — cartographic figures.

## CV PDF

`public/downloads/Hasti-Alitab-Academic-CV.pdf` is generated from the `/cv/` page, so it contains no date of birth, phone number or institutional email. To regenerate after edits (with the site served locally):

```bash
msedge --headless --no-pdf-header-footer --print-to-pdf=public/downloads/Hasti-Alitab-Academic-CV.pdf http://localhost:4321/cv/
```

Or replace it with a designed public CV of your own using the same filename.

## Deployment (GitHub Pages)

1. Push this project to the `main` branch of the GitHub repository.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Each push to `main` runs `.github/workflows/deploy.yml` (build, then deploy).

`astro.config.mjs` derives `site` and `base` from the repository during CI (`GITHUB_REPOSITORY`):

- repo `hastialitab/hasti-alitab.github.io` (current) is a *project site*, served at `https://hastialitab.github.io/hasti-alitab.github.io/`;
- to get the shorter `https://hastialitab.github.io/`, rename the repo to `hastialitab.github.io` (Settings → General → Repository name) and re-run the workflow; no code change is needed.

Internal links and assets go through `url()` in `src/lib/url.ts`, and `robots.txt` is generated, so both layouts work. For a custom domain, set `SITE_URL` and `BASE_PATH=/` in the workflow's build step and add `public/CNAME`.

To test a base-path build locally: `GITHUB_REPOSITORY=hastialitab/hasti-alitab.github.io npm run build`, then serve `dist/` under that prefix (`astro preview` ignores the base path).

> The project folder currently sits inside a git repository rooted at the Windows user directory. Run `git init` inside this folder (or copy it elsewhere) before pushing.

## Credits

Basemap: Esri World Terrain (attribution shown on the map). Fonts: Playfair Display, Inter, IBM Plex Sans via Fontsource. Icons: Lucide.

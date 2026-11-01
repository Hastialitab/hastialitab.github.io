// All internal links and public asset paths go through this helper so the site
// works from the domain root or from a sub-path (see `base` in astro.config.mjs).
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

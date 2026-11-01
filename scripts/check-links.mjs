const base = 'http://localhost:4400';
const seen = new Map(), queue = ['/'], problems = [], assets = new Set();
const pageIds = new Map();
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path);
  seen.set(path, res.status);
  if (res.status !== 200) { problems.push(`${res.status} ${path}`); continue; }
  const html = await res.text();
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) problems.push(`duplicate ids on ${path}: ${[...new Set(dup)]}`);
  pageIds.set(path, new Set(ids));
  const title = html.match(/<title>([^<]+)/)?.[1]; const desc = html.match(/<meta name="description" content="([^"]+)/)?.[1];
  if (!title || !desc || !/<h1[ >]/.test(html)) problems.push(`missing title/description/h1 on ${path}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) problems.push(`h1 count != 1 on ${path}`);
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(mailto:|https?:|data:|tel:)/.test(u)) { if (u.startsWith('http') && !u.includes('hasti-alitab.github.io') && !/localhost/.test(u)) assets.add('EXTERNAL ' + u); continue; }
    if (u.startsWith('#')) { if (!ids.includes(u.slice(1))) problems.push(`bad fragment ${u} on ${path}`); continue; }
    if (!u.startsWith('/')) { problems.push(`relative url ${u} on ${path}`); continue; }
    const [p, frag] = u.split('#');
    if (/\.(html|\w+)$/.test(p) && !p.endsWith('/')) assets.add(p); else queue.push(p);
    if (frag) assets.add(`FRAG ${p}#${frag}`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) assets.add(part.trim().split(' ')[0]);
}
for (const a of assets) {
  if (a.startsWith('EXTERNAL')) { console.log(a); continue; }
  if (a.startsWith('FRAG ')) { const [p, f] = a.slice(5).split('#');    const ids = pageIds.get(p); if (ids && !ids.has(f)) problems.push(`bad cross-page fragment ${p}#${f}`); continue; }
  const r = await fetch(base + a); if (r.status !== 200) problems.push(`${r.status} asset ${a}`);
}
console.log('pages crawled:', [...seen.keys()].length, [...seen.keys()].join(' '));
console.log('assets checked:', [...assets].filter(a=>!a.startsWith('EXTERNAL')&&!a.startsWith('FRAG')).length);
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'No problems found');
const sm = await (await fetch(base + '/sitemap-0.xml')).text(); console.log('sitemap urls:', (sm.match(/<loc>/g) || []).length);
console.log('robots:', (await fetch(base + '/robots.txt')).status, 'favicon:', (await fetch(base + '/favicon.svg')).status, 'cv pdf:', (await fetch(base + '/downloads/Hasti-Alitab-Academic-CV.pdf')).status, '404 page:', (await fetch(base + '/nope/')).status);

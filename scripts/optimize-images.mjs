// Generates responsive WebP variants next to every source JPG/PNG in public/images.
// Runs automatically before `npm run build`. Originals are never modified.
// Output files are named <name>-<width>.webp and are git-ignored (they are rebuilt in CI).
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const WIDTHS = [400, 640, 800, 1200];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield p;
  }
}

let made = 0;
for await (const file of walk(ROOT)) {
  const { dir, name } = parse(file);
  const srcTime = (await stat(file)).mtimeMs;
  const meta = await sharp(file).metadata();
  for (const w of WIDTHS) {
    if (w > meta.width) continue; // never upscale
    const out = join(dir, `${name}-${w}.webp`);
    const exists = await stat(out).then((s) => s.mtimeMs >= srcTime, () => false);
    if (exists) continue;
    await sharp(file).resize({ width: Math.min(w, meta.width), withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} variant(s) written`);

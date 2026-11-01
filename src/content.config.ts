import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const fieldwork = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/fieldwork' }),
  schema: z.object({
    site: z.string(),
    location: z.string(),
    region: z.string(),
    year: z.number(),
    order: z.number(),
    mission: z.string(), // mission type as documented in the CV
    role: z.string(),
    directors: z.string(),
    summary: z.string(),
    // Approximate, area-level coordinates only. Leave undefined while pending.
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
        precision: z.string(),
        source: z.string(),
      })
      .optional(),
    // Add files under public/images/archaeological-sites/<slug>/ and list them here.
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
          credit: z.string(),
          kind: z.enum(['personal', 'documentary', 'illustrative']),
        }),
      )
      .default([]),
  }),
});

export { fieldwork };
export const collections = { fieldwork };

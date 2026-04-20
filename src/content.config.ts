import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const travel = defineCollection({
  loader: glob({ base: './src/content/travel', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const life = defineCollection({
  loader: glob({ base: './src/content/life', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const reading = defineCollection({
  loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    translator: z.string().optional(),
    publisher: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    category: z.string(),
    cover: z.string().optional(),
    rating: z.number().min(1).max(5).default(0),
    status: z.enum(['reading', 'finished', 'unread']).default('unread'),
    progress: z.number().min(0).max(100).default(0),
    hasNotes: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, travel, life, reading };

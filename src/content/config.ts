
import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.nullable( z.string()),
    article: z.object({
        section: z.string(),
        authors: z.array(z.string()),
        tags: z.optional(z.array(z.string())),
        pubDate: z.string().or(z.date()),
        image: z.optional(z.string()),
    })
  })
});

export const collections = {
  'post': postCollection
};
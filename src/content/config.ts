
import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    article: z.object({
        section: z.string(),
        authors: z.array(z.string()),
        tags: z.array(z.string()),
        pubDate: z.string(),
        image: z.optional(z.string()),
    })
  })
});

export const collections = {
  'post': postCollection
};
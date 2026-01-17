import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Mike Thompson'),
    authorRole: z.string().default('Owner, We Buy Your Junk LLC'),
    category: z.enum(['Market Update', 'How-To', 'Industry News', 'Tips & Tricks', 'Community']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    author: z.string(),
    company: z.string().optional(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
    featured: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['general', 'pricing', 'services', 'junk-cars', 'auto-parts']).default('general'),
    order: z.number().default(0),
  }),
});

export const collections = { insights, team, testimonials, faqs };

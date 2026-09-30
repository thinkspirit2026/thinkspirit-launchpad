import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const spaces = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/spaces",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1).max(60),
      author: z.string().min(1).max(40),
      tagline: z.string().min(1).max(120),
      stage: z.enum(["idea", "draft", "building", "shipped"]),
      tags: z.array(z.string().min(1).max(24)).min(1).max(5),
      accent: z.enum(["lime", "blue", "coral"]).default("lime"),
      updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      example: z.boolean().default(false),
      cover: image().optional(),
      repo: z.url({ protocol: /^https$/ }).optional(),
      demo: z.url({ protocol: /^https$/ }).optional(),
    }),
});
export const collections = { spaces };

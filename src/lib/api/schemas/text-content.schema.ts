import { z } from "zod";

export const createPostFacetTagSchema = z.object({
  type: z.literal("Tag"),
  index: z.object({
    start: z.number(),
    end: z.number(),
  }),
  profileId: z.string().uuid(),
});
export const createPostFacetHashtagSchema = z.object({
  type: z.literal("Hashtag"),
  index: z.object({
    start: z.number(),
    end: z.number(),
  }),
  tag: z.string(),
});
export const createPostFacetSchema = z.discriminatedUnion("type", [
  createPostFacetTagSchema,
  createPostFacetHashtagSchema,
]);
export const createPostContentSchema = z.object({
  text: z.string(),
  facets: z.array(createPostFacetSchema),
});

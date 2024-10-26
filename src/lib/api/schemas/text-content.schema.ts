import { z } from "zod";
import { baseProfileSchema, profileSchema } from "./profile.schema";

export const baseFacetIndexSchema = z.object({
  start: z.number(),
  end: z.number(),
});
export const baseFacetSchema = z.object({
  type: z.enum(["Tag", "Hashtag"]),
  index: baseFacetIndexSchema,
});
export const tagFacetSchema = baseFacetSchema.extend({
  type: z.literal("Tag"),
  profileId: z.string().uuid(),
  profile: profileSchema,
});
export const hashtagFacetSchema = baseFacetSchema.extend({
  type: z.literal("Hashtag"),
  tag: z.string(),
});
export const facetSchema = z.discriminatedUnion("type", [
  tagFacetSchema,
  hashtagFacetSchema,
]);
export const textContentSchema = z.object({
  text: z.string(),
  facets: z.array(facetSchema),
});

export const tagFacetRequestSchema = tagFacetSchema.omit({ profile: true });
export const hashtagFacetRequestSchema = hashtagFacetSchema;
export const facetRequestSchema = z.discriminatedUnion("type", [
  tagFacetRequestSchema,
  hashtagFacetRequestSchema,
]);
export const textContentRequestSchema = textContentSchema.extend({
  facets: z.array(facetRequestSchema),
});

export const tagFacetResponseSchema = tagFacetSchema
  .omit({ profileId: true })
  .extend({
    profile: baseProfileSchema.pick({
      id: true,
      type: true,
    }),
  });
export const hashtagFacetResponseSchema = hashtagFacetSchema;
export const facetResponseSchema = z.discriminatedUnion("type", [
  tagFacetResponseSchema,
  hashtagFacetResponseSchema,
]);
export const textContentResponseSchema = textContentSchema.extend({
  facets: z.array(facetResponseSchema),
});

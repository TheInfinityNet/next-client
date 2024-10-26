import { z } from "zod";

export const createPostAudiencePublicSchema = z.object({
  type: z.literal("Public"),
});
export const createPostAudiencePrivateSchema = z.object({
  type: z.literal("Private"),
});
export const createPostAudienceOnlyMeSchema = z.object({
  type: z.literal("OnlyMe"),
});
export const createPostAudienceIncludeSchema = z.object({
  type: z.literal("Include"),
  include: z.array(z.string().uuid()),
});
export const createPostAudienceExcludeSchema = z.object({
  type: z.literal("Exclude"),
  exclude: z.array(z.string().uuid()),
});
export const createPostAudienceCustomSchema = createPostAudienceIncludeSchema
  .merge(createPostAudienceExcludeSchema)
  .extend({
    type: z.literal("Custom"),
  });
export const createPostAudienceSchema = z.discriminatedUnion("type", [
  createPostAudiencePublicSchema,
  createPostAudiencePrivateSchema,
  createPostAudienceOnlyMeSchema,
  createPostAudienceIncludeSchema,
  createPostAudienceExcludeSchema,
  createPostAudienceCustomSchema,
]);

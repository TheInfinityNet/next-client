import { z } from "zod";
import { baseProfileSchema } from "./profile.schema";

export const basePostAudienceSchema = z.object({
  type: z.enum(["Public", "Private", "OnlyMe", "Include", "Exclude", "Custom"]),
});
export const postAudiencePublicSchema = basePostAudienceSchema.extend({
  type: z.literal("Public"),
});
export const postAudiencePrivateSchema = basePostAudienceSchema.extend({
  type: z.literal("Private"),
});
export const postAudienceOnlyMeSchema = basePostAudienceSchema.extend({
  type: z.literal("OnlyMe"),
});
export const postAudienceIncludeSchema = basePostAudienceSchema.extend({
  type: z.literal("Include"),
  includeIds: z.array(z.string().uuid()),
  include: z.array(baseProfileSchema),
});
export const postAudienceExcludeSchema = basePostAudienceSchema.extend({
  type: z.literal("Exclude"),
  excludeIds: z.array(z.string().uuid()),
  exclude: z.array(baseProfileSchema),
});
export const postAudienceCustomSchema = postAudienceIncludeSchema
  .merge(postAudienceExcludeSchema)
  .extend({
    type: z.literal("Custom"),
  });

export const postAudienceSchema = z.discriminatedUnion("type", [
  postAudiencePublicSchema,
  postAudiencePrivateSchema,
  postAudienceOnlyMeSchema,
  postAudienceIncludeSchema,
  postAudienceExcludeSchema,
  postAudienceCustomSchema,
]);

export const postAudiencePublicRequestSchema = postAudiencePublicSchema;
export const postAudiencePrivateRequestSchema = postAudiencePrivateSchema;
export const postAudienceOnlyMeRequestSchema = postAudienceOnlyMeSchema;
export const postAudienceIncludeRequestSchema = postAudienceIncludeSchema.omit({
  include: true,
});
export const postAudienceExcludeRequestSchema = postAudienceExcludeSchema.omit({
  exclude: true,
});
export const postAudienceCustomRequestSchema = postAudienceCustomSchema.omit({
  include: true,
  exclude: true,
});
export const postAudienceRequestSchema = z.discriminatedUnion("type", [
  postAudiencePublicRequestSchema,
  postAudiencePrivateRequestSchema,
  postAudienceOnlyMeRequestSchema,
  postAudienceIncludeRequestSchema,
  postAudienceExcludeRequestSchema,
  postAudienceCustomRequestSchema,
]);

export const postAudiencePublicResponseSchema = postAudiencePublicSchema;
export const postAudiencePrivateResponseSchema = postAudiencePrivateSchema;
export const postAudienceOnlyMeResponseSchema = postAudienceOnlyMeSchema;
export const postAudienceIncludeResponseSchema = postAudienceIncludeSchema.omit(
  {
    includeIds: true,
  },
);
export const postAudienceExcludeResponseSchema = postAudienceExcludeSchema.omit(
  {
    excludeIds: true,
  },
);
export const postAudienceCustomResponseSchema = postAudienceCustomSchema.omit({
  includeIds: true,
  excludeIds: true,
});

export const postAudienceResponseSchema = z.discriminatedUnion("type", [
  postAudiencePublicResponseSchema,
  postAudiencePrivateResponseSchema,
  postAudienceOnlyMeResponseSchema,
  postAudienceIncludeResponseSchema,
  postAudienceExcludeResponseSchema,
  postAudienceCustomResponseSchema,
]);

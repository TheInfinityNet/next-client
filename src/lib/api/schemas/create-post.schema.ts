import { z } from "zod";
import { postAudienceRequestSchema } from "./post-audience.schema";
import { textContentRequestSchema } from "./text-content.schema";

export const createPostBaseRequestSchema = z.object({
  content: textContentRequestSchema.optional(),
  audiance: postAudienceRequestSchema,
});
export const createTextPostRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("Text"),
  content: textContentRequestSchema,
});
export const createPostPhotoRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("Photo"),
  photoId: z.string().uuid(),
});
export const createPostVideoRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("Video"),
  videoId: z.string().uuid(),
});
export const createPostAudioRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("Audio"),
  audioId: z.string().uuid(),
});
export const createPostFileRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("File"),
  fileId: z.string().uuid(),
});
export const createPostShareRequestSchema = createPostBaseRequestSchema.extend({
  type: z.literal("Share"),
  shareId: z.string().uuid(),
});
export const createPostAggregatedRequestSchema =
  createPostBaseRequestSchema.extend({
    type: z.literal("Aggregated"),
    aggregates: z.array(
      z.discriminatedUnion("type", [
        createPostPhotoRequestSchema,
        createPostVideoRequestSchema,
      ]),
    ),
  });
export const createPostRequestSchema = z.discriminatedUnion("type", [
  createTextPostRequestSchema,
  createPostPhotoRequestSchema,
  createPostVideoRequestSchema,
  createPostAudioRequestSchema,
  createPostFileRequestSchema,
  createPostShareRequestSchema,
  createPostAggregatedRequestSchema,
]);
export type CreatePostRequestSchema = z.infer<typeof createPostRequestSchema>;
export type CreateAggregatedPostRequestSchema = z.infer<
  typeof createPostAggregatedRequestSchema
>;

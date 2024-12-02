import { z } from "zod";
import {
  basePostAudienceSchema,
  postAudienceRequestSchema,
} from "./post-audience.schema";
import {
  textContentRequestSchema,
  textContentResponseSchema,
  textContentSchema,
} from "./text-content.schema";
import {
  audioMetadataResponseSchema,
  fileMetadataResponseSchema,
  photoMetadataResponseSchema,
  photoMetadataSchema,
  videoMetadataResponseSchema,
} from "./metadata.schema";
import { baseProfileResponseSchema } from "./profile.schema";
import { commentResponseSchema } from "./comment.schema";
import {
  postReactionCountsResponseSchema,
  postReactionTypeSchema,
} from "./post-reaction.schema";

export const basePostSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    "Text",
    "Photo",
    "Video",
    "Audio",
    "File",
    "Share",
    "MultiMedia",
  ]),
  ownerId: z.string().uuid(),
  audience: basePostAudienceSchema,
  content: textContentSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
});
export const textPostSchema = basePostSchema.extend({
  type: z.literal("Text"),
  content: textContentSchema,
});
export const photoPostSchema = basePostSchema.extend({
  type: z.literal("Photo"),
  photoId: z.string().uuid(),
  photo: photoMetadataSchema,
});
export const videoPostSchema = basePostSchema.extend({
  type: z.literal("Video"),
  videoId: z.string().uuid(),
  video: photoMetadataSchema,
});
export const audioPostSchema = basePostSchema.extend({
  type: z.literal("Audio"),
  audioId: z.string().uuid(),
  audio: photoMetadataSchema,
});
export const filePostSchema = basePostSchema.extend({
  type: z.literal("File"),
  fileId: z.string().uuid(),
  file: photoMetadataSchema,
});
export const sharePostSchema = basePostSchema.extend({
  type: z.literal("Share"),
  shareId: z.string().uuid(),
  share: basePostSchema,
});
export const multiMediaPostSchema = basePostSchema.extend({
  type: z.literal("MultiMedia"),
  aggregates: z.array(
    z.discriminatedUnion("type", [
      photoPostSchema.extend({ type: z.literal("Photo") }),
      videoPostSchema.extend({ type: z.literal("Video") }),
    ]),
  ),
});
export const postSchema = z.discriminatedUnion("type", [
  textPostSchema,
  photoPostSchema,
  videoPostSchema,
  audioPostSchema,
  filePostSchema,
  sharePostSchema,
  multiMediaPostSchema,
]);

export const basePostRequestSchema = basePostSchema
  .omit({
    // id: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .extend({
    audience: postAudienceRequestSchema,
  });

export const textPostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("Text"),
  content: textContentRequestSchema,
});
export const photoPostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("Photo"),
  photoId: z.string().uuid(),
});
export const videoPostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("Video"),
  videoId: z.string().uuid(),
});
export const audioPostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("Audio"),
  audioId: z.string().uuid(),
});
export const filePostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("File"),
  fileId: z.string().uuid(),
});
export const sharePostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("Share"),
  shareId: z.string().uuid(),
});
export const multiMediaPostRequestSchema = basePostRequestSchema.extend({
  type: z.literal("MultiMedia"),
  aggregates: z.array(
    z.discriminatedUnion("type", [
      photoPostRequestSchema,
      videoPostRequestSchema,
    ]),
  ),
});
export const postRequestSchema = z.discriminatedUnion("type", [
  textPostRequestSchema,
  photoPostRequestSchema,
  videoPostRequestSchema,
  audioPostRequestSchema,
  filePostRequestSchema,
  sharePostRequestSchema,
  multiMediaPostRequestSchema,
]);

export const basePostResponseSchema = basePostSchema
  .omit({
    ownerId: true,
  })
  .extend({
    audience: basePostAudienceSchema,
    reactionCounts: postReactionCountsResponseSchema.optional(),
    reaction: postReactionTypeSchema.optional(),
    commentCount: z.number(),
    popularComments: z.array(commentResponseSchema).optional(),
    owner: baseProfileResponseSchema.pick({
      id: true,
      type: true,
      avatar: true,
      name: true,
    }),
  });

export const textPostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("Text"),
  content: textContentResponseSchema,
});
export const photoPostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("Photo"),
  photo: photoMetadataResponseSchema,
});
export const videoPostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("Video"),
  video: videoMetadataResponseSchema,
});
export const audioPostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("Audio"),
  audio: audioMetadataResponseSchema,
});
export const filePostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("File"),
  file: fileMetadataResponseSchema,
});
export const multiMediaPostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("MultiMedia"),
  aggregates: z.array(
    z.discriminatedUnion("type", [
      photoPostResponseSchema.extend({
        parentId: z.string().uuid(),
      }),
      videoPostResponseSchema.extend({
        parentId: z.string().uuid(),
      }),
    ]),
  ),
});
export const sharePostResponseSchema = basePostResponseSchema.extend({
  type: z.literal("Share"),
  share: z.discriminatedUnion("type", [
    textPostResponseSchema,
    photoPostResponseSchema,
    videoPostResponseSchema,
    audioPostResponseSchema,
    filePostResponseSchema,
    multiMediaPostResponseSchema,
  ]),
});

export const postResponseSchema = z.discriminatedUnion("type", [
  textPostResponseSchema,
  photoPostResponseSchema,
  videoPostResponseSchema,
  audioPostResponseSchema,
  filePostResponseSchema,
  sharePostResponseSchema,
  multiMediaPostResponseSchema,
]);

export type PostResponseSchema = z.infer<typeof postResponseSchema>;
export type PostRequestSchema = z.infer<typeof postRequestSchema>;

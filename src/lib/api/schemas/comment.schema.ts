import { z } from "zod";
import { baseProfileResponseSchema } from "./profile.schema";
import {textContentRequestSchema, textContentSchema} from "./text-content.schema";
import {
  commentReactionCountsResponseSchema,
  commentReactionTypeSchema,
} from "./comment-reaction.schema";
import {postAudienceRequestSchema} from "@/lib/api/schemas/post-audience.schema";
import {createPostBaseRequestSchema} from "@/lib/api/schemas/create-post.schema";
import {
  audioPostRequestSchema, filePostRequestSchema, multiMediaPostRequestSchema,
  photoPostRequestSchema, sharePostRequestSchema,
  textPostRequestSchema,
  videoPostRequestSchema
} from "@/lib/api/schemas/post.schema";

export const baseCommentSchema = z.object({
  id: z.coerce.string().uuid(),
  postId: z.coerce.string().uuid(),
  ownerId: z.coerce.string().uuid(),
  content: textContentSchema,
  replyCount: z.number(),
  parentId: z.coerce.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
});

export const commentResponseSchema = baseCommentSchema
  .omit({
    ownerId: true,
  })
  .extend({
    owner: baseProfileResponseSchema.pick({
      id: true,
      type: true,
      avatar: true,
      name: true,
    }),
    reactionCounts: commentReactionCountsResponseSchema.optional(),
    reaction: commentReactionTypeSchema.optional(),
  });

export const commentBaseRequestSchema = z.object({
  postId: z.coerce.string().uuid(),
  content: textContentRequestSchema,
});

export const textCommentRequestSchema = commentBaseRequestSchema.extend({
  type: z.literal("Text"),
});
export const photoCommentRequestSchema = commentBaseRequestSchema.extend({
  type: z.literal("Photo"),
  photoId: z.string().uuid(),
});
export const videoCommentRequestSchema = commentBaseRequestSchema.extend({
  type: z.literal("Video"),
  videoId: z.string().uuid(),
});
export const commentRequestSchema = z.discriminatedUnion("type", [
  textCommentRequestSchema,
  photoCommentRequestSchema,
  videoCommentRequestSchema,
]);
export type CommentResponseSchema = z.infer<typeof commentResponseSchema>;

import { z } from "zod";
import { baseProfileResponseSchema } from "./profile.schema";
import { textContentSchema } from "./text-content.schema";

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
  });

export type CommentResponseSchema = z.infer<typeof commentResponseSchema>;

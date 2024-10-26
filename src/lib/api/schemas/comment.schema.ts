import { z } from "zod";
import { profileSchema } from "./profile.schema";
import { textContentSchema } from "./text-content.schema";

export const baseCommentSchema = z.object({
  id: z.coerce.string().uuid(),
  postId: z.coerce.string().uuid(),
  ownerProfileId: z.coerce.string().uuid(),
  ownerProfile: profileSchema,
  content: textContentSchema,
  parentId: z.coerce.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
});

export const commentResponseSchema = baseCommentSchema.omit({
  ownerProfileId: true,
  postId: true,
  parentId: true,
});

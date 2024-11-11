import { z } from "zod";
import { photoMetadataResponseSchema } from "./metadata.schema";

export const notificationSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    "TaggedInPost",
    "FriendInvitation",
    "NewFollowerPost",
    "NewGroupPost",
    "PostReaction",
    "CommentReaction",
    "ReplyToPost",
    "ReplyToComment",
    "TaggedInComment",
    "Miscellaneous",
  ]),
  thumbnailId: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  permalink: z.string().url(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const notificationResponseSchema = notificationSchema
  .omit({
    thumbnailId: true,
  })
  .extend({
    thumbnail: photoMetadataResponseSchema.optional(),
  });

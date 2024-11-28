import { z } from "zod";
import { baseProfileResponseSchema } from "./profile.schema";

export const commentReactionTypeSchema = z.enum([
  "Like",
  "Love",
  "Haha",
  "Wow",
  "Sad",
  "Angry",
]);

export type CommentReactionTypeSchema = z.infer<
  typeof commentReactionTypeSchema
>;

export const commentReactionSchema = z.object({
  id: z.string(),
  commentId: z.string(),
  profileId: z.string(),
  reaction: commentReactionTypeSchema,
  createdAt: z.string(),
});
export type CommentReactionSchema = z.infer<typeof commentReactionSchema>;

export const commentReactionResponseSchema = commentReactionSchema
  .omit({
    profileId: true,
  })
  .extend({
    profile: baseProfileResponseSchema.pick({
      id: true,
      name: true,
      avatar: true,
      type: true,
    }),
  });

export const commentReactionCountsResponseSchema = z.record(
  commentReactionTypeSchema.or(z.literal("All")),
  z.number(),
);
export type CommentReactionCountsResponse = z.infer<
  typeof commentReactionCountsResponseSchema
>;

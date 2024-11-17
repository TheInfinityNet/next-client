import { z } from "zod";
import { baseProfileResponseSchema } from "./profile.schema";

export const postReactionTypeSchema = z.enum([
  "Like",
  "Love",
  "Haha",
  "Wow",
  "Sad",
  "Angry",
]);

export type PostReactionTypeSchema = z.infer<typeof postReactionTypeSchema>;

export const postReactionSchema = z.object({
  id: z.string(),
  postId: z.string(),
  profileId: z.string(),
  reaction: postReactionTypeSchema,
  createdAt: z.string(),
});
export type PostReactionSchema = z.infer<typeof postReactionSchema>;

export const postReactionResponseSchema = postReactionSchema
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

export const postReactionCountsResponseSchema = z.record(
  postReactionTypeSchema.or(z.literal("All")),
  z.number(),
);
export type PostReactionCountsResponse = z.infer<
  typeof postReactionCountsResponseSchema
>;

import { z } from "zod";
import { userProfileResponseSchema } from "./profile.schema";
import { unauthorizedErrorResponseSchema } from "./error.schema";

export const getFriendsSuggestionQuerySchema = z.object({
  userId: z.string().optional(),
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});
export const getFriendsSuggestionResponseSchema = z.object({
  items: z.array(
    userProfileResponseSchema
      .pick({
        id: true,
        name: true,
        avatar: true,
      })
      .extend({
        mutualFriendsCount: z.number().optional(),
      }),
  ),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

export const getFriendsSuggestionErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);

export type GetFriendsSuggestionQuerySchema = z.infer<
  typeof getFriendsSuggestionQuerySchema
>;
export type GetFriendsSuggestionResponseSchema = z.infer<
  typeof getFriendsSuggestionResponseSchema
>;
export type GetFriendsSuggestionErrorResponseSchema = z.infer<
  typeof getFriendsSuggestionErrorResponseSchema
>;

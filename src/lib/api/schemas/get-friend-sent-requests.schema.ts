import { z } from "zod";
import { userProfileResponseSchema } from "./profile.schema";
import { unauthorizedErrorResponseSchema } from "./error.schema";
import { friendStatusSchema } from "./friend-status.schema";

export const getFriendSentRequestsQuerySchema = z.object({
  userId: z.string().optional(),
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});
export const getFriendSentRequestsResponseSchema = z.object({
  items: z.array(
    userProfileResponseSchema
      .pick({
        id: true,
        name: true,
        avatar: true,
      })
      .extend({
        mutualFriendsCount: z.number().optional(),
        status: z.literal(friendStatusSchema.enum.RequestSent),
      }),
  ),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

export const getFriendSentRequestsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);

export type GetFriendSentRequestsQuerySchema = z.infer<
  typeof getFriendSentRequestsQuerySchema
>;
export type GetFriendSentRequestsResponseSchema = z.infer<
  typeof getFriendSentRequestsResponseSchema
>;
export type GetFriendSentRequestsErrorResponseSchema = z.infer<
  typeof getFriendSentRequestsErrorResponseSchema
>;

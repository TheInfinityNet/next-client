import { z } from "zod";
import { userProfileResponseSchema } from "./profile.schema";
import { unauthorizedErrorResponseSchema } from "./error.schema";
import { friendStatusSchema } from "./friend-status.schema";

export const getFriendRequestsQuerySchema = z.object({
  userId: z.string().optional(),
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});
export const getFriendRequestsResponseSchema = z.object({
  items: z.array(
    userProfileResponseSchema
      .pick({
        id: true,
        name: true,
        avatar: true,
      })
      .extend({
        mutualFriendsCount: z.number().optional(),
        status: z.literal(friendStatusSchema.enum.RequestReceived),
      }),
  ),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

export const getFriendRequestsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);

export type GetFriendRequestsQuerySchema = z.infer<
  typeof getFriendRequestsQuerySchema
>;
export type GetFriendRequestsResponseSchema = z.infer<
  typeof getFriendRequestsResponseSchema
>;
export type GetFriendRequestsErrorResponseSchema = z.infer<
  typeof getFriendRequestsErrorResponseSchema
>;

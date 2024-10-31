import { z } from "zod";
import { userProfileResponseSchema } from "./profile.schema";
import { unauthorizedErrorResponseSchema } from "./error.schema";
import { friendStatusSchema } from "./friend-status.schema";

export const getFriendListQuerySchema = z.object({
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});
export const getFriendListResponseSchema = z.object({
  items: z.array(
    userProfileResponseSchema
      .pick({
        id: true,
        name: true,
        avatar: true,
      })
      .extend({
        mutualFriendsCount: z.number().optional(),
        status: z.literal(friendStatusSchema.enum.Connected),
      }),
  ),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

export const getFriendListErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type GetFriendListQuerySchema = z.infer<typeof getFriendListQuerySchema>;
export type GetFriendListResponseSchema = z.infer<
  typeof getFriendListResponseSchema
>;
export type GetFriendListErrorResponseSchema = z.infer<
  typeof getFriendListErrorResponseSchema
>;

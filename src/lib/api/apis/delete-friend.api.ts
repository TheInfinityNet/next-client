import { z } from "zod";
import { apiClient } from "../client";
import { friendStatusSchema } from "../schemas/friend-status.schema";

export const removeFriendParamsSchema = z.object({
  userId: z.string(),
});
export type RemoveFriendParamsSchema = z.infer<typeof removeFriendParamsSchema>;

export const removeFriendResponseSchema = z.object({
  userId: z.string(),
  status: friendStatusSchema,
  message: z.string(),
});
export type RemoveFriendResponseSchema = z.infer<
  typeof removeFriendResponseSchema
>;

export const removeFriendErrorResponseSchema = z.object({
  message: z.string(),
});
export type RemoveFriendErrorResponseSchema = z.infer<
  typeof removeFriendErrorResponseSchema
>;

export async function removeFriendApi(params: RemoveFriendParamsSchema) {
  const response = await apiClient.delete<RemoveFriendResponseSchema>(
    `/relationships/friends/${params.userId}`,
  );
  return response.data;
}

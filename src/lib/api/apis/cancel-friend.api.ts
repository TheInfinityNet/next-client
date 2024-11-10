import { z } from "zod";
import { apiClient } from "../client";
import { friendStatusSchema } from "../schemas/friend-status.schema";
import { useMutation } from "@tanstack/react-query";

export const cancelFriendParamsSchema = z.object({
  userId: z.string(),
});
export type CancelFriendParamsSchema = z.infer<typeof cancelFriendParamsSchema>;

export const cancelFriendResponseSchema = z.object({
  userId: z.string(),
  status: friendStatusSchema,
  message: z.string(),
});
export type CancelFriendResponseSchema = z.infer<
  typeof cancelFriendResponseSchema
>;

export const cancelFriendErrorResponseSchema = z.object({
  message: z.string(),
});
export type CancelFriendErrorResponseSchema = z.infer<
  typeof cancelFriendErrorResponseSchema
>;

export async function cancelFriendApi(body: CancelFriendParamsSchema) {
  const response = await apiClient.delete<CancelFriendResponseSchema>(
    `/friends/requests/${body.userId}`,
  );
  return response.data;
}

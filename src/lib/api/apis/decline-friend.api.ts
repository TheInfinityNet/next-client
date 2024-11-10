import { z } from "zod";
import { apiClient } from "../client";
import { friendStatusSchema } from "../schemas/friend-status.schema";
import { useMutation } from "@tanstack/react-query";

export const declineFriendBodySchema = z.object({
  userId: z.string(),
});
export type DeclineFriendBodySchema = z.infer<typeof declineFriendBodySchema>;

export const declineFriendResponseSchema = z.object({
  userId: z.string(),
  status: friendStatusSchema,
  message: z.string(),
});
export type DeclineFriendResponseSchema = z.infer<
  typeof declineFriendResponseSchema
>;

export const declineFriendErrorResponseSchema = z.object({
  message: z.string(),
});
export type DeclineFriendErrorResponseSchema = z.infer<
  typeof declineFriendErrorResponseSchema
>;

export async function declineFriendApi(body: DeclineFriendBodySchema) {
  const response = await apiClient.put<DeclineFriendResponseSchema>(
    `/friends/requests/decline`,
    body,
  );
  return response.data;
}

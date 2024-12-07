import { z } from "zod";
import { apiClient } from "../client";
import { friendStatusSchema } from "../schemas/friend-status.schema";

export const addFriendBodySchema = z.object({
  userId: z.string(),
});
export type AddFriendBodySchema = z.infer<typeof addFriendBodySchema>;
export const addFriendResponseSchema = z.object({
  userId: z.string(),
  status: friendStatusSchema,
  message: z.string(),
});
export type AddFriendResponseSchema = z.infer<typeof addFriendResponseSchema>;

export const addFriendErrorResponseSchema = z.object({
  message: z.string(),
});
export type AddFriendErrorResponseSchema = z.infer<
  typeof addFriendErrorResponseSchema
>;

export async function addFriendApi(body: AddFriendBodySchema) {
  const response = await apiClient.post<AddFriendResponseSchema>(
    `/relationships/friends/requests`,
    body,
  );
  return response.data;
}

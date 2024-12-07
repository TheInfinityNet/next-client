import { z } from "zod";
import { apiClient } from "../client";
import { friendStatusSchema } from "../schemas/friend-status.schema";
import { useMutation } from "@tanstack/react-query";

export const acceptFriendBodySchema = z.object({
  userId: z.string(),
});
export type AcceptFriendBodySchema = z.infer<typeof acceptFriendBodySchema>;

export const acceptFriendResponseSchema = z.object({
  userId: z.string(),
  status: friendStatusSchema,
  message: z.string(),
});
export type AcceptFriendResponseSchema = z.infer<
  typeof acceptFriendResponseSchema
>;

export const acceptFriendErrorResponseSchema = z.object({
  message: z.string(),
});
export type AcceptFriendErrorResponseSchema = z.infer<
  typeof acceptFriendErrorResponseSchema
>;

export async function acceptFriendApi(body: AcceptFriendBodySchema) {
  const response = await apiClient.put<AcceptFriendResponseSchema>(
    `/relationships/friends/requests/accept`,
    body,
  );
  return response.data;
}

export function useAcceptFriendMutation() {
  return useMutation<
    AcceptFriendResponseSchema,
    AcceptFriendErrorResponseSchema,
    AcceptFriendBodySchema
  >({
    mutationKey: ["accept-friend"],
    mutationFn: (params) => acceptFriendApi(params),
  });
}

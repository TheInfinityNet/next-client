import { z } from "zod";
import { apiClient } from "../client";
import { postReactionCountsResponseSchema } from "../schemas/post-reaction.schema";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";

export const deletePostReactionParamsSchema = z.object({
  postId: z.string(),
});

export type DeletePostReactionParamsSchema = z.infer<
  typeof deletePostReactionParamsSchema
>;

export const deletePostReactionResponseSchema = z.object({
  reactionCounts: postReactionCountsResponseSchema,
});
export type DeletePostReactionResponseSchema = z.infer<
  typeof deletePostReactionResponseSchema
>;

export const deletePostReactionErrorResponse = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);
export type DeletePostReactionErrorResponseSchema = z.infer<
  typeof deletePostReactionErrorResponse
>;

export async function deletePostReactionApi(
  params: DeletePostReactionParamsSchema,
) {
  const response = await apiClient.delete<DeletePostReactionResponseSchema>(
    `/posts/${params.postId}/reactions`,
  );
  return response.data;
}

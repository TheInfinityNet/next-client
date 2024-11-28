import { z } from "zod";
import { apiClient } from "../client";
import { commentReactionCountsResponseSchema } from "../schemas/comment-reaction.schema";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";

export const deleteCommentReactionParamsSchema = z.object({
  commentId: z.string(),
});

export type DeleteCommentReactionParamsSchema = z.infer<
  typeof deleteCommentReactionParamsSchema
>;

export const deleteCommentReactionResponseSchema = z.object({
  reactionCounts: commentReactionCountsResponseSchema,
});
export type DeleteCommentReactionResponseSchema = z.infer<
  typeof deleteCommentReactionResponseSchema
>;

export const deleteCommentReactionErrorResponse = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);
export type DeleteCommentReactionErrorResponseSchema = z.infer<
  typeof deleteCommentReactionErrorResponse
>;

export async function deleteCommentReactionApi(
  params: DeleteCommentReactionParamsSchema,
) {
  const response = await apiClient.delete<DeleteCommentReactionResponseSchema>(
    `/comments/${params.commentId}/reactions`,
  );
  return response.data;
}

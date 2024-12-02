import { z } from "zod";
import {
  commentReactionResponseSchema,
  commentReactionTypeSchema,
} from "../schemas/comment-reaction.schema";
import { apiClient } from "../client";

export const getCommentReactionsParamsSchema = z.object({
  commentId: z.string(),
});
export type GetCommentReactionsParams = z.infer<
  typeof getCommentReactionsParamsSchema
>;

export const getCommentReactionsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
  type: commentReactionTypeSchema.optional(),
});
export type GetCommentReactionsQuery = z.infer<
  typeof getCommentReactionsQuerySchema
>;

export const getCommentReactionsResponseSchema = z.object({
  items: z.array(commentReactionResponseSchema),
  nextCursor: z.string().optional(),
});
export type GetCommentReactionsResponse = z.infer<
  typeof getCommentReactionsResponseSchema
>;

export async function getCommentReactionsApi(
  params: GetCommentReactionsParams,
  query: GetCommentReactionsQuery,
) {
  const response = await apiClient.get<GetCommentReactionsResponse>(
    `/reactions/comments/${params.commentId}`,
    query,
  );
  return response.data;
}

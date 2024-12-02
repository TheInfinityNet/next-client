import { z } from "zod";
import {
  postReactionResponseSchema,
  postReactionTypeSchema,
} from "../schemas/post-reaction.schema";
import { apiClient } from "../client";

export const getPostReactionsParamsSchema = z.object({
  postId: z.string(),
});
export type GetPostReactionsParams = z.infer<
  typeof getPostReactionsParamsSchema
>;

export const getPostReactionsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
  type: postReactionTypeSchema.optional(),
});
export type GetPostReactionsQuery = z.infer<typeof getPostReactionsQuerySchema>;

export const getPostReactionsResponseSchema = z.object({
  items: z.array(postReactionResponseSchema),
  nextCursor: z.string().optional(),
});
export type GetPostReactionsResponse = z.infer<
  typeof getPostReactionsResponseSchema
>;

export async function getPostReactionsApi(
  params: GetPostReactionsParams,
  query: GetPostReactionsQuery,
) {
  const response = await apiClient.get<GetPostReactionsResponse>(
    `/reactions/posts/${params.postId}`,
    query,
  );
  return response.data;
}

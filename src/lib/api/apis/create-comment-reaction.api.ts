import { z } from "zod";
import {
  commentReactionCountsResponseSchema,
  commentReactionTypeSchema,
} from "../schemas/comment-reaction.schema";
import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";

export const createCommentReactionParamsSchema = z.object({
  commentId: z.string(),
});

export type CreateCommentReactionParamsSchema = z.infer<
  typeof createCommentReactionParamsSchema
>;

export const createCommentReactionBodySchema = z.object({
  reaction: commentReactionTypeSchema,
});

export type CreateCommentReactionBodySchema = z.infer<
  typeof createCommentReactionBodySchema
>;

export const createCommentReactionResponseSchema = z.object({
  reaction: commentReactionTypeSchema,
  reactionCounts: commentReactionCountsResponseSchema,
});

export type CreateCommentReactionResponseSchema = z.infer<
  typeof createCommentReactionResponseSchema
>;

export const createCommentReactionErrorResponse = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type CreateCommentReactionErrorResponseSchema = z.infer<
  typeof createCommentReactionErrorResponse
>;

export async function createCommentReactionApi(
  params: CreateCommentReactionParamsSchema,
  body: CreateCommentReactionBodySchema,
) {
  const response = await apiClient.post<CreateCommentReactionResponseSchema>(
    `/comments/${params.commentId}/reactions`,
    body,
  );
  return response.data;
}

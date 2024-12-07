import { z } from "zod";
import {
  postReactionCountsResponseSchema,
  postReactionTypeSchema,
} from "../schemas/post-reaction.schema";
import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";

export const createPostReactionParamsSchema = z.object({
  postId: z.string(),
});

export type CreatePostReactionParamsSchema = z.infer<
  typeof createPostReactionParamsSchema
>;

export const createPostReactionBodySchema = z.object({
  reaction: postReactionTypeSchema,
});

export type CreatePostReactionBodySchema = z.infer<
  typeof createPostReactionBodySchema
>;

export const createPostReactionResponseSchema = z.object({
  reaction: postReactionTypeSchema,
  reactionCounts: postReactionCountsResponseSchema,
});

export type CreatePostReactionResponseSchema = z.infer<
  typeof createPostReactionResponseSchema
>;

export const createPostReactionErrorResponse = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type CreatePostReactionErrorResponseSchema = z.infer<
  typeof createPostReactionErrorResponse
>;

export async function createPostReactionApi(
  params: CreatePostReactionParamsSchema,
  body: CreatePostReactionBodySchema,
) {
  const response = await apiClient.post<CreatePostReactionResponseSchema>(
    `/reactions/posts/${params.postId}`,
    body,
  );
  return response.data;
}

import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../client";
import {isAxiosError} from "axios";
import {forbiddenErrorResponseSchema, validationErrorResponseSchema} from "@/lib/api/schemas/error.schema";
import {commentRequestSchema} from "@/lib/api/schemas/comment.schema";

export const createCommentBodySchema = commentRequestSchema;
export type CreateCommentBodySchema = z.infer<typeof createCommentBodySchema>;

export const createCommentResponseSchema = z.object({
  id: z.string().uuid(),
});

export type CreateCommentResponseSchema = z.infer<typeof createCommentResponseSchema>;

export const createCommentErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
  forbiddenErrorResponseSchema
]);
export type CreateCommentErrorResponseSchema = z.infer<
  typeof createCommentErrorResponseSchema
>;

export async function createPostApi(body: CreateCommentBodySchema) {
  const response = await apiClient.post<CreateCommentResponseSchema>(
    "/comments",
    body,
  );
  return response.data;
}

export function useCreateCommentMutation() {
  return useMutation<
      CreateCommentResponseSchema,
      CreateCommentErrorResponseSchema,
      CreateCommentBodySchema
  >({
    mutationKey: ["create-comment"],
    mutationFn: (params) => createPostApi(params),
    throwOnError: (error) => isAxiosError(error),
  });
}

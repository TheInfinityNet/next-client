import { z } from "zod";
import { postRequestSchema } from "../schemas/post.schema";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../client";

export const createPostBodySchema = postRequestSchema;
export type CreatePostBodySchema = z.infer<typeof createPostBodySchema>;

export const createPostResponseSchema = z.object({
  id: z.string().uuid(),
});

export type CreatePostResponseSchema = z.infer<typeof createPostResponseSchema>;

export const createPostErrorResponseSchema = z.object({
  message: z.string(),
});
export type CreatePostErrorResponseSchema = z.infer<
  typeof createPostErrorResponseSchema
>;

export async function createPostApi(body: CreatePostBodySchema) {
  const endpoint = {
    Text: "/posts/text",
    Video: "/posts/media",
    Photo: "/posts/media",
    MultiMedia: "/posts/multi-media",
    Audio: "/posts/media",
    File: "/posts/file",
    Share: "/posts/share",
  }[body.type];

  const response = await apiClient.post<CreatePostResponseSchema>(
    endpoint,
    body,
  );
  return response.data;
}

export function useCreatePostMutation() {
  return useMutation<
    CreatePostResponseSchema,
    CreatePostErrorResponseSchema,
    CreatePostBodySchema
  >({
    mutationKey: ["create-post"],
    mutationFn: (params) => createPostApi(params),
  });
}

import {
  createPostReactionApi,
  CreatePostReactionBodySchema,
  CreatePostReactionErrorResponseSchema,
  CreatePostReactionParamsSchema,
  CreatePostReactionResponseSchema,
} from "@/lib/api/apis/create-post-reaction.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreatePostReactionMutation(
  params: CreatePostReactionParamsSchema,
) {
  return useMutation<
    CreatePostReactionResponseSchema,
    CreatePostReactionErrorResponseSchema,
    CreatePostReactionBodySchema
  >({
    mutationKey: ["createPostReaction"],
    mutationFn: (body) => createPostReactionApi(params, body),
    throwOnError: (error) => isAxiosError(error),
  });
}

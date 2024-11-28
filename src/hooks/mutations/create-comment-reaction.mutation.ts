import {
  createCommentReactionApi,
  CreateCommentReactionBodySchema,
  CreateCommentReactionErrorResponseSchema,
  CreateCommentReactionParamsSchema,
  CreateCommentReactionResponseSchema,
} from "@/lib/api/apis/create-comment-reaction.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreateCommentReactionMutation(
  params: CreateCommentReactionParamsSchema,
) {
  return useMutation<
    CreateCommentReactionResponseSchema,
    CreateCommentReactionErrorResponseSchema,
    CreateCommentReactionBodySchema
  >({
    mutationKey: ["createCommentReaction"],
    mutationFn: (body) => createCommentReactionApi(params, body),
    throwOnError: (error) => isAxiosError(error),
  });
}

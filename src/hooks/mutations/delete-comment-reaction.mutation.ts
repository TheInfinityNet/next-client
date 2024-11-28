import {
  deleteCommentReactionApi,
  DeleteCommentReactionErrorResponseSchema,
  DeleteCommentReactionParamsSchema,
  DeleteCommentReactionResponseSchema,
} from "@/lib/api/apis/delete-comment-reaction.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteCommentReactionMutation(
  params: DeleteCommentReactionParamsSchema,
) {
  return useMutation<
    DeleteCommentReactionResponseSchema,
    DeleteCommentReactionErrorResponseSchema
  >({
    mutationKey: ["deleteCommentReaction"],
    mutationFn: () => deleteCommentReactionApi(params),
    throwOnError: (error) => isAxiosError(error),
  });
}

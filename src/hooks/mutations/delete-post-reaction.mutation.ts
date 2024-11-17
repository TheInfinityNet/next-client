import {
  deletePostReactionApi,
  DeletePostReactionErrorResponseSchema,
  DeletePostReactionParamsSchema,
  DeletePostReactionResponseSchema,
} from "@/lib/api/apis/delete-post-reaction";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeletePostReactionMutation(
  params: DeletePostReactionParamsSchema,
) {
  return useMutation<
    DeletePostReactionResponseSchema,
    DeletePostReactionErrorResponseSchema
  >({
    mutationKey: ["deletePostReaction"],
    mutationFn: () => deletePostReactionApi(params),
    throwOnError: (error) => isAxiosError(error),
  });
}

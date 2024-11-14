import {
  removeFriendApi,
  RemoveFriendErrorResponseSchema,
  RemoveFriendParamsSchema,
  RemoveFriendResponseSchema,
} from "@/lib/api/apis/delete-friend.api";
import { useMutation } from "@tanstack/react-query";

export function useRemoveFriendMutation() {
  return useMutation<
    RemoveFriendResponseSchema,
    RemoveFriendErrorResponseSchema,
    RemoveFriendParamsSchema
  >({
    mutationKey: ["remove-friend"],
    mutationFn: (params) => removeFriendApi(params),
  });
}

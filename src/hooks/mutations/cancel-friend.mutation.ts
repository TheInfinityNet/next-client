import {
  cancelFriendApi,
  CancelFriendErrorResponseSchema,
  CancelFriendParamsSchema,
  CancelFriendResponseSchema,
} from "@/lib/api/apis/cancel-friend.api";
import { useMutation } from "@tanstack/react-query";

export function useCancelFriendMutation() {
  return useMutation<
    CancelFriendResponseSchema,
    CancelFriendErrorResponseSchema,
    CancelFriendParamsSchema
  >({
    mutationKey: ["cancel-friend-request"],
    mutationFn: (params) => cancelFriendApi(params),
  });
}

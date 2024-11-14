import {
  acceptFriendApi,
  AcceptFriendBodySchema,
  AcceptFriendErrorResponseSchema,
  AcceptFriendResponseSchema,
} from "@/lib/api/apis/accept-friend.api";
import { useMutation } from "@tanstack/react-query";

export function useAcceptFriendMutation() {
  return useMutation<
    AcceptFriendResponseSchema,
    AcceptFriendErrorResponseSchema,
    AcceptFriendBodySchema
  >({
    mutationKey: ["accept-friend"],
    mutationFn: (params) => acceptFriendApi(params),
  });
}

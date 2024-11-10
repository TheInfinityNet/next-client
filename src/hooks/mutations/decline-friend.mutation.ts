import {
  declineFriendApi,
  DeclineFriendBodySchema,
  DeclineFriendErrorResponseSchema,
  DeclineFriendResponseSchema,
} from "@/lib/api/apis/decline-friend.api";
import { useMutation } from "@tanstack/react-query";

export function useDeclineFriendMutation() {
  return useMutation<
    DeclineFriendResponseSchema,
    DeclineFriendErrorResponseSchema,
    DeclineFriendBodySchema
  >({
    mutationKey: ["decline-friend"],
    mutationFn: (body) => declineFriendApi(body),
  });
}

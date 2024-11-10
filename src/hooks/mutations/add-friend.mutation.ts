import {
  addFriendApi,
  AddFriendBodySchema,
  AddFriendErrorResponseSchema,
  AddFriendResponseSchema,
} from "@/lib/api/apis/add-friend.api";
import { useMutation } from "@tanstack/react-query";

export function useAddFriendMutation() {
  const mutationKey = ["add-friend"] as const;
  return useMutation<
    AddFriendResponseSchema,
    AddFriendErrorResponseSchema,
    AddFriendBodySchema
  >({
    mutationKey: mutationKey,
    mutationFn: (data) => addFriendApi(data),
  });
}

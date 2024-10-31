import { getFriendSentRequestsApi } from "@/lib/api/apis/get-friend-sent-request.api";
import {
  GetFriendSentRequestsQuerySchema,
  GetFriendSentRequestsResponseSchema,
} from "@/lib/api/schemas/get-friend-sent-requests.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetFriendSentRequestsQueryOptions(
  query: GetFriendSentRequestsQuerySchema,
) {
  const queryKey = ["friends-sent-requests", query.userId];
  console.log(query);
  return infiniteQueryOptions<GetFriendSentRequestsResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getFriendSentRequestsApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
}

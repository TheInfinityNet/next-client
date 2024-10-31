import { getFriendRequestsApi } from "@/lib/api/apis/get-friend-requests.api";
import {
  GetFriendRequestsQuerySchema,
  GetFriendRequestsResponseSchema,
} from "@/lib/api/schemas/get-friend-requests.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetFriendRequestsQueryOptions(
  query: GetFriendRequestsQuerySchema,
) {
  const queryKey = ["friends-requests", query.userId];
  console.log(query);
  return infiniteQueryOptions<GetFriendRequestsResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getFriendRequestsApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
}

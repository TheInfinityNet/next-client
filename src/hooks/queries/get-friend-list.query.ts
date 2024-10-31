import { getFriendListApi } from "@/lib/api/apis/get-friend-list.api";
import {
  GetFriendListQuerySchema,
  GetFriendListResponseSchema,
} from "@/lib/api/schemas/get-friend-list.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetFriendListQueryOptions(
  query: GetFriendListQuerySchema,
) {
  const queryKey = ["friend-list"];
  console.log(query);
  return infiniteQueryOptions<GetFriendListResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getFriendListApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
}

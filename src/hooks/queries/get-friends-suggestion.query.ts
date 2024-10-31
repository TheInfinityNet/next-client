import { getFriendSuggestionsApi } from "@/lib/api/apis/get-friends-suggestion.api";
import {
  GetFriendsSuggestionQuerySchema,
  GetFriendsSuggestionResponseSchema,
} from "@/lib/api/schemas/get-friends-suggestion.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetFriendsSuggestionQueryOptions(
  query: GetFriendsSuggestionQuerySchema,
) {
  const queryKey = ["friends-suggestion", query.userId];
  console.log(query);
  return infiniteQueryOptions<GetFriendsSuggestionResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getFriendSuggestionsApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
}

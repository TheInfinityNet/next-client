import {
  getPostReactionsApi,
  GetPostReactionsParams,
  GetPostReactionsQuery,
  GetPostReactionsResponse,
} from "@/lib/api/apis/get-post-reactions.api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetPostReactionsInfinityQueryOptions(
  params: GetPostReactionsParams,
  query: GetPostReactionsQuery,
) {
  const queryKey = ["post-reactions", params.postId, query.type];
  return infiniteQueryOptions<GetPostReactionsResponse>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getPostReactionsApi(params, {
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

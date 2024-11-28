import {
  getCommentReactionsApi,
  GetCommentReactionsParams,
  GetCommentReactionsQuery,
  GetCommentReactionsResponse,
} from "@/lib/api/apis/get-comment-reaction.api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetCommentReactionsInfinityQueryOptions(
  params: GetCommentReactionsParams,
  query: GetCommentReactionsQuery,
) {
  const queryKey = ["comment-reactions", params.commentId, query.type];
  return infiniteQueryOptions<GetCommentReactionsResponse>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getCommentReactionsApi(params, {
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

import {
  getProfilePostsApi,
  GetProfilePostsParamsSchema,
  GetProfilePostsQuerySchema, GetProfilePostsResponseSchema,
} from "@/lib/api/apis/get-timeline-posts.api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetProfilePostsInfinityQueryOptions(
    params: GetProfilePostsParamsSchema,
  query: GetProfilePostsQuerySchema,
) {
  const queryKey = ["posts", "profile", query] as const;
  return infiniteQueryOptions<GetProfilePostsResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getProfilePostsApi(params, {
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

import {
  getTimelinePostsApi,
  GetTimelinePostsQuerySchema,
  GetTimelinePostsResponseSchema,
} from "@/lib/api/apis/get-timeline-posts.api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetTimelinePostsInfinityQueryOptions(
  query: GetTimelinePostsQuerySchema,
) {
  const queryKey = ["posts", "timeline", query] as const;
  return infiniteQueryOptions<GetTimelinePostsResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getTimelinePostsApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

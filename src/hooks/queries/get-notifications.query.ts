import { getNotificationsApi } from "@/lib/api/apis/get-notifications.api";
import {
  GetNotificationsQuerySchema,
  GetNotificationsResponseSchema,
} from "@/lib/api/schemas/get-notifications.schema";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function createGetNotificationQueryOptions(
  query: GetNotificationsQuerySchema
) {
  const queryKey = ["notifications", { type: query.type }];
  console.log(query);
  return infiniteQueryOptions<GetNotificationsResponseSchema>({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getNotificationsApi({
        ...query,
        cursor: pageParam as string,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });
}

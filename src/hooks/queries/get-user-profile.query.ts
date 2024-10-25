import { getUserProfileApi } from "@/lib/api/apis/get-user-profile.api";
import {
  GetUserProfileErrorResponseSchema,
  GetUserProfileParamsSchema,
  GetUserProfileQueriesSchema,
  GetUserProfileResponseSchema,
} from "@/lib/api/schemas/get-user-profile.schema";

import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetUserProfileQueryOptions(
  params: GetUserProfileParamsSchema,
  query?: GetUserProfileQueriesSchema,
) {
  return queryOptions<
    GetUserProfileResponseSchema,
    GetUserProfileErrorResponseSchema
  >({
    queryKey: ["user-profile", params, query],
    queryFn: () => getUserProfileApi(params, query),
    throwOnError: (error) => isAxiosError(error),
    retry: 1,
  });
}

export function useGetUserProfileQuery(
  params: GetUserProfileParamsSchema,
  query?: GetUserProfileQueriesSchema,
) {
  return useSuspenseQuery(createGetUserProfileQueryOptions(params, query));
}

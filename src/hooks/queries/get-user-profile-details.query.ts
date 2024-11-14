import { getUserProfileApi } from "@/lib/api/apis/get-user-profile.api";
import {
  GetUserProfileDetailsErrorResponseSchema,
  GetUserProfileDetailsParamsSchema,
  GetUserProfileDetailsQueriesSchema,
  GetUserProfileDetailsResponseSchema,
} from "@/lib/api/schemas/get-user-profile-details.schema";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetUserProfileDetailsQueryOptions(
  params: GetUserProfileDetailsParamsSchema,
  query?: GetUserProfileDetailsQueriesSchema,
) {
  return queryOptions<
    GetUserProfileDetailsResponseSchema,
    GetUserProfileDetailsErrorResponseSchema
  >({
    queryKey: ["user-profile", params, query],
    queryFn: () => getUserProfileApi(params, query),
    throwOnError: (error) => isAxiosError(error),
    retry: 1,
  });
}

export function useGetUserProfileQuery(
  params: GetUserProfileDetailsParamsSchema,
  query?: GetUserProfileDetailsQueriesSchema,
) {
  return useSuspenseQuery(createGetUserProfileDetailsQueryOptions(params, query));
}

import { getUserProfileApi } from "@/lib/api/apis/get-user-profile.api";
import {
  GetUserProfileErrorResponseSchema,
  GetUserProfileParamsSchema,
  GetUserProfileQueriesSchema,
  GetUserProfileResponseSchema,
} from "@/lib/api/schemas/get-user-profile.schema";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function createGetUserProfileQueryOptions(
  params: GetUserProfileParamsSchema,
  query: GetUserProfileQueriesSchema,
) {
  return queryOptions<
    GetUserProfileResponseSchema,
    GetUserProfileErrorResponseSchema
  >({
    queryKey: ["user-profile", params, query],
    queryFn: () => getUserProfileApi(params, query),
  });
}

export function useGetUserProfileQuery(
  params: GetUserProfileParamsSchema,
  query: GetUserProfileQueriesSchema,
) {
  return useQuery(createGetUserProfileQueryOptions(params, query));
}

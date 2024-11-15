import { getGroupProfileApi } from "@/lib/api/apis/get-group-profile.api";
import {
  GetGroupProfileErrorResponse,
  GetGroupProfileParams,
  GetGroupProfileQueries,
  GetGroupProfileResponse,
} from "@/lib/api/schemas/get-group-profile.schema";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetGroupProfileQueryOptions(
  params: GetGroupProfileParams,
  query?: GetGroupProfileQueries,
) {
  return queryOptions<GetGroupProfileResponse, GetGroupProfileErrorResponse>({
    queryKey: ["group-profile", params, query],
    queryFn: () => getGroupProfileApi(params, query),
    throwOnError: (error) => isAxiosError(error),
    retry: 1,
  });
}

export function useGetGroupProfileQuery(
  params: GetGroupProfileParams,
  query?: GetGroupProfileQueries,
) {
  return useSuspenseQuery(createGetGroupProfileQueryOptions(params, query));
}

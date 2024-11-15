// src/hooks/queries/get-group-about.ts

import { getGroupAboutApi } from "@/lib/api/apis/get-group-about.api";
import {
  GetGroupAboutErrorResponse,
  GetGroupAboutParams,
  GetGroupAboutResponse,
} from "@/lib/api/schemas/get-group-about.schema";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetGroupAboutQueryOptions(params: GetGroupAboutParams) {
  return queryOptions<GetGroupAboutResponse, GetGroupAboutErrorResponse>({
    queryKey: ["group-about", params],
    queryFn: () => getGroupAboutApi(params),
    throwOnError: (error) => isAxiosError(error),
    retry: 1,
  });
}

export function useGetGroupAboutQuery(params: GetGroupAboutParams) {
  return useSuspenseQuery(createGetGroupAboutQueryOptions(params));
}

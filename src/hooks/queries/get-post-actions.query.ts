import { queryOptions } from "@tanstack/react-query";
import {GetPostActionsParamsSchema} from "@/lib/api/schemas/get-post-actions.schema";
import {getPostActionsApi} from "@/lib/api/apis/get-post-actions.api";

export function createGetPostActionsQueryOptions(
  params: GetPostActionsParamsSchema,
  options?: {
    enabled?: boolean;
  },
) {
  return queryOptions({
    queryKey: ["post-actions", params],
    queryFn: () => getPostActionsApi(params),
    retry: 1,
    ...options,
  });
}

import { getGroupActionsApi } from "@/lib/api/apis/get-group-actions.api";
import { GetGroupActionsParamsSchema } from "@/lib/api/schemas/get-group-actions.schema";
import { queryOptions } from "@tanstack/react-query";

export function createGetGroupActionsQueryOptions(
  params: GetGroupActionsParamsSchema,
  options?: {
    enabled?: boolean;
  },
) {
  return queryOptions({
    queryKey: ["group-actions", params],
    queryFn: () => getGroupActionsApi(params),
    retry: 1,
    ...options,
  });
}

import { getProfileActionsApi } from "@/lib/api/apis/get-profile-actions.api";
import { GetProfileActionsParamsSchema } from "@/lib/api/schemas/get-profile-actions.schema";
import { queryOptions } from "@tanstack/react-query";

export function createGetProfileActionsQueryOptions(
  params: GetProfileActionsParamsSchema,
) {
  return queryOptions({
    queryKey: ["profile-actions", params],
    queryFn: () => getProfileActionsApi(params),
    retry: 1,
  });
}

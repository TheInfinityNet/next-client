import { apiClient } from "../client";
import {
  GetGroupActionsParamsSchema,
  GetGroupActionsResponseSchema,
} from "../schemas/get-group-actions.schema";

export async function getGroupActionsApi(
  params: GetGroupActionsParamsSchema,
): Promise<GetGroupActionsResponseSchema> {
  const response = await apiClient.get<GetGroupActionsResponseSchema>(
    `/group/${params.groupId}/actions`,
  );
  return response.data;
}

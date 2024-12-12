import { apiClient } from "../client";
import {
  GetProfileActionsParamsSchema,
  GetProfileActionsResponseSchema,
} from "../schemas/get-profile-actions.schema";

export async function getProfileActionsApi(
  params: GetProfileActionsParamsSchema,
): Promise<GetProfileActionsResponseSchema> {
  const response = await apiClient.get<GetProfileActionsResponseSchema>(
    `/profiles/${params.profileId}/actions`,
  );
  return response.data;
}

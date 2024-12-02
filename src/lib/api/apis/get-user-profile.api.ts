import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";
import {
  GetUserProfileParamsSchema,
  GetUserProfileQueriesSchema,
  GetUserProfileResponseSchema,
} from "../schemas/get-user-profile.schema";

export async function getUserProfileApi(
  params: GetUserProfileParamsSchema,
  query?: GetUserProfileQueriesSchema,
  config?: AxiosRequestConfig<GetUserProfileQueriesSchema>,
): Promise<GetUserProfileResponseSchema> {
  const response = await apiClient.get<
    GetUserProfileResponseSchema,
    GetUserProfileQueriesSchema
  >(`/profiles/users/${params.userId}`, query, {
    ...config,
  });
  return response.data;
}

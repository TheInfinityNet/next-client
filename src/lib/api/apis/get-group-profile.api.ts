import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";
import {
  GetGroupProfileParamsSchema,
  GetGroupProfileQueriesSchema,
  GetGroupProfileResponseSchema,
} from "../schemas/get-group-profile.schema";

export async function getGroupProfileApi(
  params: GetGroupProfileParamsSchema,
  query?: GetGroupProfileQueriesSchema,
  config?: AxiosRequestConfig<GetGroupProfileQueriesSchema>,
): Promise<GetGroupProfileResponseSchema> {
  const response = await apiClient.get<GetGroupProfileResponseSchema, GetGroupProfileQueriesSchema>(
    `/groups/${params.groupId}`,
    query,
    { ...config }
  );

  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";
import {
  GetGroupProfileParams,
  GetGroupProfileQueries,
  GetGroupProfileResponse,
} from "../schemas/get-group-profile.schema";

export async function getGroupProfileApi(
  params: GetGroupProfileParams,
  query?: GetGroupProfileQueries,
  config?: AxiosRequestConfig<GetGroupProfileQueries>,
): Promise<GetGroupProfileResponse> {
  const response = await apiClient.get<GetGroupProfileResponse, GetGroupProfileQueries>(
    `/groups/${params.groupId}`,
    query,
    { ...config }
  );

  return response.data;
}

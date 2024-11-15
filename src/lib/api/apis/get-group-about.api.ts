// src/lib/api/apis/get-group-about.api.ts

import { apiClient } from "../client";
import { GetGroupAboutParams, GetGroupAboutResponse } from "@/lib/api/schemas/get-group-about.schema";

export async function getGroupAboutApi(params: GetGroupAboutParams): Promise<GetGroupAboutResponse> {
  const { groupId } = params;
  const response = await apiClient.get<GetGroupAboutResponse>(`/groups/${groupId}/about`);
  return response.data;
}

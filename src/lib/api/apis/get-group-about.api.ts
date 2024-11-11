// src/lib/api/apis/get-group-about.api.ts

import axios from "axios";
import { GetGroupAboutParams, GetGroupAboutResponse } from "@/lib/api/schemas/get-group-about.schema";

export async function getGroupAboutApi(params: GetGroupAboutParams): Promise<GetGroupAboutResponse> {
  const { groupId } = params;
  const response = await axios.get(`/api/groups/${groupId}/about`);
  return response.data;
}

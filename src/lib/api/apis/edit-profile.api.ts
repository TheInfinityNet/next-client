import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import {
  EditUserProfileSchema,
  EditUserProfileResponseSchema,
} from "@/lib/api/schemas/edit-user-profile.schema";

export async function editProfileApi(
  data: EditUserProfileSchema,
  config?: AxiosRequestConfig<EditUserProfileSchema>,
): Promise<EditUserProfileResponseSchema> {
  const response = await apiClient.put<
    EditUserProfileResponseSchema,
    EditUserProfileSchema
  >("/profiles/users", data, config);
  return response.data;
}
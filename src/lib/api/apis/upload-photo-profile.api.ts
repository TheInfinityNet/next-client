import { apiClient } from "../client";
import {UploadPhotoProfileRequestSchema, UploadPhotoProfileResponseSchema} from "@/lib/api/schemas/profile.schema";
import {AxiosRequestConfig} from "axios";

export async function uploadAvatarApi(
  data: UploadPhotoProfileRequestSchema,
  config?: AxiosRequestConfig<UploadPhotoProfileRequestSchema>,
): Promise<UploadPhotoProfileResponseSchema> {
  const response = await apiClient.put<
      UploadPhotoProfileResponseSchema,
      UploadPhotoProfileRequestSchema
  >("/profiles/avatar", data, config);
  return response.data;
}

export async function uploadCoverApi(
    data: UploadPhotoProfileRequestSchema,
    config?: AxiosRequestConfig<UploadPhotoProfileRequestSchema>,
): Promise<UploadPhotoProfileResponseSchema> {
  const response = await apiClient.put<
      UploadPhotoProfileResponseSchema,
      UploadPhotoProfileRequestSchema
  >("/profiles/cover", data, config);
  return response.data;
}
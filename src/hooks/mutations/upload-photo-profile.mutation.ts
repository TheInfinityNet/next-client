import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {UploadPhotoProfileRequestSchema, UploadPhotoProfileResponseSchema} from "@/lib/api/schemas/profile.schema";
import {uploadAvatarApi, uploadCoverApi} from "@/lib/api/apis/upload-photo-profile.api";
import {
  EditUserProfileErrorResponse
} from "@/lib/api/schemas/edit-user-profile.schema";

export function useUploadAvatarMutation() {
  return useMutation<
      UploadPhotoProfileResponseSchema,
      EditUserProfileErrorResponse,
      UploadPhotoProfileRequestSchema
  >({
    mutationKey: ["upload-avatar"],
    mutationFn: (data) => uploadAvatarApi(data),
    throwOnError: (error) => isAxiosError(error),
  });
}

export function useUploadCoverMutation() {
  return useMutation<
      UploadPhotoProfileResponseSchema,
      EditUserProfileErrorResponse,
      UploadPhotoProfileRequestSchema
  >({
    mutationKey: ["upload-cover"],
    mutationFn: (data) => uploadCoverApi(data),
    throwOnError: (error) => isAxiosError(error),
  });
}
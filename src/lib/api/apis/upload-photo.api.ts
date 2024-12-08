import { z } from "zod";
import { fileMetadataResponseSchema } from "../schemas/metadata.schema";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";
import { apiClient } from "../client";
import { useMutation } from "@tanstack/react-query";

const UPLOAD_PHOTO_MAX_SIZE_MB = 10;

export const uploadPhotoBodySchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size < UPLOAD_PHOTO_MAX_SIZE_MB * 1024 * 1024, {
      message: `Photo size should be less than ${UPLOAD_PHOTO_MAX_SIZE_MB}MB`,
    }),
});

export type UploadPhotoBodySchema = z.infer<typeof uploadPhotoBodySchema>;

export const uploadPhotoResponseSchema = fileMetadataResponseSchema;

export type UploadPhotoResponseSchema = z.infer<
  typeof uploadPhotoResponseSchema
>;

export const uploadPhotoErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type UploadPhotoErrorResponseSchema = z.infer<
  typeof uploadPhotoErrorResponseSchema
>;

export async function uploadPhotoApi(body: UploadPhotoBodySchema) {
  const formData = new FormData();
  formData.append("photo", body.photo);
  const response = await apiClient.post<UploadPhotoResponseSchema>(
    "/files/upload/photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export function useUploadPhotoMutation() {
  const mutationKey = ["upload-photo", "photo"] as const;
  return useMutation({
    mutationKey,
    mutationFn: (body: UploadPhotoBodySchema) => uploadPhotoApi(body),
  });
}

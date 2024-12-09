import { z } from "zod";
import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";
import { useMutation } from "@tanstack/react-query";
import { fileMetadataResponseSchema } from "../schemas/metadata.schema";

const UPLOAD_VIDEO_MAX_SIZE_MB = 500;

export const uploadVideoBodySchema = z.object({
  video: z
    .instanceof(File)
    .refine((file) => file.size < UPLOAD_VIDEO_MAX_SIZE_MB * 1024 * 1024, {
      message: `Video size should be less than ${UPLOAD_VIDEO_MAX_SIZE_MB}MB`,
    }),
});

export type UploadVideoBodySchema = z.infer<typeof uploadVideoBodySchema>;

export const uploadVideoResponseSchema = fileMetadataResponseSchema;

export type UploadVideoResponseSchema = z.infer<
  typeof uploadVideoResponseSchema
>;

export const uploadVideoErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type UploadVideoErrorResponseSchema = z.infer<
  typeof uploadVideoErrorResponseSchema
>;

export async function uploadVideoApi(body: UploadVideoBodySchema) {
  const formData = new FormData();
  formData.append("video", body.video);
  const response = await apiClient.post<UploadVideoResponseSchema>(
    "/files/upload/video",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export function useUploadVideoMutation() {
  const mutationKey = ["upload-video", "video"] as const;
  return useMutation({
    mutationKey,
    mutationFn: (body: UploadVideoBodySchema) => uploadVideoApi(body),
  });
}

import { z } from "zod";
import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";
import { useMutation } from "@tanstack/react-query";
import { fileMetadataResponseSchema } from "../schemas/metadata.schema";

const UPLOAD_MAX_SIZE_MB = 100;

export const uploadFileBodySchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size < UPLOAD_MAX_SIZE_MB * 1024 * 1024, {
      message: `File size should be less than ${UPLOAD_MAX_SIZE_MB}MB`,
    }),
});

export type UploadFileBodySchema = z.infer<typeof uploadFileBodySchema>;

export const uploadFileResponseSchema = fileMetadataResponseSchema;

export type UploadFileResponseSchema = z.infer<typeof uploadFileResponseSchema>;

export const uploadFileErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);
export type UploadFileErrorResponseSchema = z.infer<
  typeof uploadFileErrorResponseSchema
>;

export async function uploadFileApi(body: UploadFileBodySchema) {
  const formData = new FormData();
  formData.append("file", body.file);
  const response = await apiClient.post<UploadFileResponseSchema>(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export function useUploadFileMutation() {
  const mutationKey = ["upload-file", "file"] as const;
  return useMutation({
    mutationKey,
    mutationFn: (body: UploadFileBodySchema) => uploadFileApi(body),
  });
}

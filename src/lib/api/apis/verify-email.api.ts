import { z } from "zod";
import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import { validationErrorResponseSchema } from "../schemas/error.schema";
import { useMutation } from "@tanstack/react-query";

export const verifyEmailBodySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});
export type VerifyEmailBodySchema = z.infer<typeof verifyEmailBodySchema>;

export const verifyEmailErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type VerifyEmailErrorResponseSchema = z.infer<
  typeof verifyEmailErrorResponseSchema
>;

export const verifyEmailResponseSchema = z.object({
  message: z.string(),
});
export type VerifyEmailResponseSchema = z.infer<
  typeof verifyEmailResponseSchema
>;

export async function verifyEmailApi(
  body: VerifyEmailBodySchema,
  config?: AxiosRequestConfig<void>,
): Promise<VerifyEmailResponseSchema> {
  const response = await apiClient.post<VerifyEmailResponseSchema>(
    `/auth/verify`,
    body,
    {
      headers: {
        "No-Auth": true,
      },
      ...config,
    },
  );
  return response.data;
}

export function useVerifyEmailMutation() {
  return useMutation<
    VerifyEmailResponseSchema,
    VerifyEmailErrorResponseSchema,
    VerifyEmailBodySchema
  >({
    mutationKey: ["verify-mail"],
    mutationFn: (params) => verifyEmailApi(params),
  });
}

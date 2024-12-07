import { z } from "zod";
import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import { validationErrorResponseSchema } from "../schemas/error.schema";
import { useMutation } from "@tanstack/react-query";

export const sendMailBodySchema = z.object({
  email: z.string().email(),
});
export type SendMailBodySchema = z.infer<typeof sendMailBodySchema>;

export const sendMailErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type SendMailErrorResponseSchema = z.infer<
  typeof sendMailErrorResponseSchema
>;

export const sendMailResponseSchema = z.object({
  message: z.string(),
  retryAfter: z.number(),
});
export type SendMailResponseSchema = z.infer<typeof sendMailResponseSchema>;

export async function sendMailApi(
  data: SendMailBodySchema,
  config?: AxiosRequestConfig<SendMailBodySchema>,
): Promise<SendMailResponseSchema> {
  const response = await apiClient.post<
    SendMailResponseSchema,
    SendMailBodySchema
  >("/auth/send-mail", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

export function useSendMailMutation() {
  return useMutation<
    SendMailResponseSchema,
    SendMailErrorResponseSchema,
    SendMailBodySchema
  >({
    mutationKey: ["send-mail"],
    mutationFn: (body) => sendMailApi(body),
  });
}

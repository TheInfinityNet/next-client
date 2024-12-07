import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import {
  SignUpRequestSchema,
  SignUpResponseSchema,
} from "../schemas/sign-up.schema";

export async function signUpApi(
  data: SignUpRequestSchema,
  config?: AxiosRequestConfig<SignUpRequestSchema>,
): Promise<SignUpResponseSchema> {
  const response = await apiClient.post<
    SignUpResponseSchema,
    SignUpRequestSchema
  >("/auth/sign-up", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

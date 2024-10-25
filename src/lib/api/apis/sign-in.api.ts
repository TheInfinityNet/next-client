import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import {
  SignInRequestSchema,
  SignInResponseSchema,
} from "../schemas/sign-in.schema";

export async function signInApi(
  data: SignInRequestSchema,
  config?: AxiosRequestConfig<SignInRequestSchema>,
): Promise<SignInResponseSchema> {
  const response = await apiClient.post<
    SignInResponseSchema,
    SignInRequestSchema
  >("/identity/auth/sign-in", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

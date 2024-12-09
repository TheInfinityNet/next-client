import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import { SignInResponseSchema } from "../schemas/sign-in.schema";
import { SocialCallbackRequestSchema } from "@/lib/api/schemas/social.schema";

export async function socialCallbackApi(
  data: SocialCallbackRequestSchema,
  config?: AxiosRequestConfig<SocialCallbackRequestSchema>,
): Promise<SignInResponseSchema> {
  const response = await apiClient.post<
    SignInResponseSchema,
    SocialCallbackRequestSchema
  >("/auth/social-callback", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

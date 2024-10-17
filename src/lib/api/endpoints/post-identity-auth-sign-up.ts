import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import type {
  PostIdentityAuthSignUpRequest,
  PostIdentityAuthSignUpResponse,
} from "../models/post-identity-auth-sign-up";

export async function postIdentityAuthSignUp(
  data: PostIdentityAuthSignUpRequest,
  config?: AxiosRequestConfig<PostIdentityAuthSignUpRequest>,
): Promise<PostIdentityAuthSignUpResponse> {
  const response = await apiClient.post<
    PostIdentityAuthSignUpResponse,
    PostIdentityAuthSignUpRequest
  >("/identity/auth/sign-up", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import type {
  PostIdentityAuthSignInRequest,
  PostIdentityAuthSignInResponse,
} from "../models/post-identity-auth-sign-in";

export async function postIdentityAuthSignIn(
  data: PostIdentityAuthSignInRequest,
  config?: AxiosRequestConfig<PostIdentityAuthSignInRequest>,
): Promise<PostIdentityAuthSignInResponse> {
  const response = await apiClient.post<
    PostIdentityAuthSignInResponse,
    PostIdentityAuthSignInRequest
  >("/identity/auth/sign-in", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}

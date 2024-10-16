import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTokenActions } from "../use-token-store";
import { useCurrentUserProfileActions } from "../use-current-user-profile-store";
import { postIdentityAuthSignIn } from "@/lib/api/endpoints/post-identity-auth-sign-in";
import {
  PostIdentityAuthSignInError,
  PostIdentityAuthSignInRequest,
  PostIdentityAuthSignInResponse,
} from "@/lib/api/models/post-identity-auth-sign-in";
import { isAxiosError } from "axios";

export function useSignInMutation() {
  const client = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentUserProfile } = useCurrentUserProfileActions();

  return useMutation<
    PostIdentityAuthSignInResponse,
    PostIdentityAuthSignInError,
    PostIdentityAuthSignInRequest
  >({
    mutationKey: ["signIn"],
    mutationFn: (data) => postIdentityAuthSignIn(data),
    onSuccess(data) {
      setAccessToken(data.tokens.accessToken);
      setRefreshToken(data.tokens.refreshToken);
      setCurrentUserProfile(data.user);
      client.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}

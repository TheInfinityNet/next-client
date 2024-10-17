import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token-store";
import { useCurrentUserProfileActions } from "../use-current-user-profile-store";
import { postIdentityAuthSignIn } from "@/lib/api/endpoints/post-identity-auth-sign-in";
import { postIdentityAuthSignUp } from "@/lib/api/endpoints/post-identity-auth-sign-up";
import {
  PostIdentityAuthSignInError,
  PostIdentityAuthSignInRequest,
  PostIdentityAuthSignInResponse,
} from "@/lib/api/models/post-identity-auth-sign-in";
import {
  PostIdentityAuthSignUpError,
  PostIdentityAuthSignUpRequest,
  PostIdentityAuthSignUpResponse,
} from "@/lib/api/models/post-identity-auth-sign-up";

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

export function useSignUpMutation() {
  return useMutation<
    PostIdentityAuthSignUpResponse,
    PostIdentityAuthSignUpError,
    PostIdentityAuthSignUpRequest
  >({
    mutationKey: ["signUp"],
    mutationFn: (data) => postIdentityAuthSignUp(data),
    throwOnError: (error) => isAxiosError(error),
  });
}

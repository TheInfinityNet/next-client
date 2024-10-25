import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token-store";
import { useCurrentUserProfileActions } from "../use-current-user-profile-store";
import {
  SignInErrorResponseSchema,
  SignInRequestSchema,
  SignInResponseSchema,
} from "@/lib/api/schemas/sign-in.schema";
import { signInApi } from "@/lib/api/apis/sign-in.api";

export function useSignInMutation() {
  const client = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentUserProfile } = useCurrentUserProfileActions();

  return useMutation<
    SignInResponseSchema,
    SignInErrorResponseSchema,
    SignInRequestSchema
  >({
    mutationKey: ["signIn"],
    mutationFn: (data) => signInApi(data),
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token-store";
import { useCurrentProfileActions } from "../use-current-profile-store";
import {
  SignInErrorResponseSchema,
  SignInRequestSchema,
  SignInResponseSchema,
} from "@/lib/api/schemas/sign-in.schema";
import { signInApi } from "@/lib/api/apis/sign-in.api";

export function useSignInMutation() {
  const client = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentProfile } = useCurrentProfileActions();

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
      setCurrentProfile(data.user);
      client.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
      setCurrentProfile(data.user);
    },
    throwOnError: (error) => isAxiosError(error),
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postIdentityAuthSignIn,
  SignInRequest,
  SignInResponse,
} from "infinity-net-api";
import { useTokenActions } from "../use-token-store";
import { useCurrentUserProfileActions } from "../use-current-user-profile-store";

export function useSignInMutation() {
  const client = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentUserProfile } = useCurrentUserProfileActions();

  return useMutation<SignInResponse, Error, SignInRequest>({
    mutationKey: ["signIn"],
    mutationFn: (data) =>
      postIdentityAuthSignIn(data, {
        headers: {
          "No-Auth": true,
        },
      }),
    onSuccess(data) {
      setAccessToken(data.tokens?.accessToken as any);
      setRefreshToken(data.tokens?.refreshToken as any);
      setCurrentUserProfile(data.user!);

      client.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
  });
}

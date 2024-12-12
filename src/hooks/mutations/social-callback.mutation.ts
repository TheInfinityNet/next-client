import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token-store";
import { useCurrentProfileActions } from "../use-current-profile-store";
import { SignInResponseSchema } from "@/lib/api/schemas/sign-in.schema";
import { socialCallbackApi } from "@/lib/api/apis/social-callback.api";
import {SocialCallbackErrorResponseSchema, SocialCallbackRequestSchema} from "@/lib/api/schemas/social.schema";

export function useSocialCallbackMutation() {
  const client = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentProfile } = useCurrentProfileActions();

  return useMutation<
    SignInResponseSchema,
    SocialCallbackErrorResponseSchema,
    SocialCallbackRequestSchema
  >({
    mutationKey: ["socialCallback"],
    mutationFn: (data) => socialCallbackApi(data),
    onSuccess(data) {
      setAccessToken(data.tokens.accessToken);
      setRefreshToken(data.tokens.refreshToken);
      setCurrentProfile(data.user);
      client.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}

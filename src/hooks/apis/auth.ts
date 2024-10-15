import { useMutation } from "@tanstack/react-query";
import {
  postIdentityAuthSignIn,
  SignInRequest,
  SignInResponse,
} from "infinity-net-api";

export function useSignInMutation() {
  return useMutation<SignInResponse, Error, SignInRequest>({
    mutationKey: ["signIn"],
    mutationFn: (data) =>
      postIdentityAuthSignIn(data, {
        headers: {
          "No-Auth": true,
        },
      }),
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.error(error);
    },
  });
}

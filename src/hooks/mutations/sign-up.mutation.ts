import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  SignUpErrorResponseSchema,
  SignUpRequestSchema,
  SignUpResponseSchema,
} from "@/lib/api/schemas/sign-up.schema";
import { signUpApi } from "@/lib/api/apis/sign-up.api";

export function useSignUpMutation() {
  return useMutation<
    SignUpResponseSchema,
    SignUpErrorResponseSchema,
    SignUpRequestSchema
  >({
    mutationKey: ["signUp"],
    mutationFn: (data) => signUpApi(data),
    throwOnError: (error) => isAxiosError(error),
  });
}

import { type SignInRequestSchema } from "../schemas/sign-in-request-schema";
import { type SignInResponseSchema } from "../schemas/sign-in-response-schema";

export type PostIdentityAuthSignInRequest = SignInRequestSchema;
export type PostIdentityAuthSignInResponse = SignInResponseSchema;
export type PostIdentityAuthSignInError = {
  type: "ValidationError";
  message: string;
  errors: Record<keyof SignInRequestSchema, string[]>;
};

import { type SignUpRequestSchema } from "../schemas/sign-up-request-schema";
import { type SignUpResponseSchema } from "../schemas/sign-up-response-schema";

export type PostIdentityAuthSignUpRequest = SignUpRequestSchema;
export type PostIdentityAuthSignUpResponse = SignUpResponseSchema;
export type PostIdentityAuthSignUpError = {
  type: "ValidationError";
  message: string;
  errors: Record<keyof SignUpRequestSchema, string[]>;
};

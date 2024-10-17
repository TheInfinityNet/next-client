import { SignUpRequestSchema } from "./sign-up-request-schema";
import { SignUpResponseSchema } from "./sign-up-response-schema";
import { ValidationErrorResponseSchema } from "./validation-error-response-schema";

export type PostIdentityAuthSignUpRequest = SignUpRequestSchema;
export type PostIdentityAuthSignUpResponse = SignUpResponseSchema;
export type PostIdentityAuthSignUpError = ValidationErrorResponseSchema;

import { SignInRequestSchema } from "./sign-in-request-schema";
import { SignInResponseSchema } from "./sign-in-response-schema";
import { ValidationErrorResponseSchema } from "./validation-error-response-schema";

export type PostIdentityAuthSignInRequest = SignInRequestSchema;
export type PostIdentityAuthSignInResponse = SignInResponseSchema;
export type PostIdentityAuthSignInError = ValidationErrorResponseSchema;

import { z } from "zod";
import {validationErrorResponseSchema} from "@/lib/api/schemas/error.schema";

export const accountProviderTypeSchema = z.enum([
    "Google",
    "Facebook"
]);

export type AccountProviderTypeSchema = z.infer<typeof accountProviderTypeSchema>;

export const socialCallbackRequestSchema = z.object({
    provider: accountProviderTypeSchema,
    code: z.string(),
});

export const socialSignInResponseSchema = z.object({
    url: z.string(),
});

export const socialCallbackErrorResponseSchema = z.discriminatedUnion("type", [
    validationErrorResponseSchema,
]);

export type SocialCallbackRequestSchema = z.infer<typeof socialCallbackRequestSchema>;
export type SocialSignInResponseSchema = z.infer<typeof socialSignInResponseSchema>;
export type SocialCallbackErrorResponseSchema = z.infer<
    typeof socialCallbackErrorResponseSchema
>;
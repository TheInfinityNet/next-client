import { z } from "zod";

export const validationErrorResponseSchema = z.object({
  type: z.literal("ValidationError"),
  message: z.string(),
  errors: z.record(z.array(z.string())),
});
export const resourceNotFoundErrorResponseSchema = z.object({
  type: z.literal("ResourceNotFound"),
  message: z.string(),
});
export const unauthorizedErrorResponseSchema = z.object({
  type: z.literal("Unauthorized"),
  message: z.string(),
});
export const forbiddenErrorResponseSchema = z.object({
  type: z.literal("Forbidden"),
  message: z.string(),
});

export type ValidationErrorResponseSchema = z.infer<
  typeof validationErrorResponseSchema
>;
export type ResourceNotFoundErrorResponseSchema = z.infer<
  typeof resourceNotFoundErrorResponseSchema
>;

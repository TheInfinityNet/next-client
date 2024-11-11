import { z } from "zod";
import { userProfileResponseSchema, userProfileStatusSchema } from "./user-profile.schema";
import { forbiddenErrorResponseSchema, resourceNotFoundErrorResponseSchema, unauthorizedErrorResponseSchema, validationErrorResponseSchema } from "./error.schema";

export const editUserProfileBodySchema = z.object({
  id: z.coerce.string().uuid(),
  username: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
  mobileNumber: z.coerce.string().optional(),
  birthdate: z.string().datetime().optional(),
  gender: z.coerce.string().optional(),
});

export const editUserProfileResponseSchema = z.object({
  message: z.string(),
  user: userProfileResponseSchema,
});
export const editUserProfileErrorResponseSchema = z.discriminatedUnion("type", [
  resourceNotFoundErrorResponseSchema,
  forbiddenErrorResponseSchema,
  unauthorizedErrorResponseSchema,
  validationErrorResponseSchema
]);
export type EditUserProfileSchema = z.infer<typeof editUserProfileBodySchema>;
export type EditUserProfileResponseSchema = z.infer<typeof editUserProfileResponseSchema>;
export type EditUserProfileErrorResponse = z.infer<typeof editUserProfileErrorResponseSchema>; 
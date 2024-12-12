import { z } from "zod";
import { userProfileResponseSchema, userProfileStatusSchema } from "./user-profile.schema";
import { forbiddenErrorResponseSchema, resourceNotFoundErrorResponseSchema, unauthorizedErrorResponseSchema, validationErrorResponseSchema } from "./error.schema";

export const editUserProfileBodySchema = z.object({
  id: z.coerce.string().uuid(),
  username: z.coerce.string().optional(),
  firstName: z.coerce.string().optional(),
  middleName: z.coerce.string().optional(),
  lastName: z.coerce.string().optional(),
  mobileNumber: z.coerce.string().optional(),
  birthdate: z.coerce.string().date().optional(),
  gender: z.coerce.string().optional(),
  bio: z.coerce.string().optional(),
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
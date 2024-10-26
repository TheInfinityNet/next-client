import { z } from "zod";
import {
  forbiddenErrorResponseSchema,
  resourceNotFoundErrorResponseSchema,
  unauthorizedErrorResponseSchema,
} from "./error.schema";
import { userProfileResponseSchema } from "./profile.schema";

export const getUserProfileParamsSchema = z.object({
  userId: z.string(),
});
export const getUserProfileQueriesSchema = z.object({
  include: z.array(z.enum(["coverPhoto", "avatarPhoto"])).optional(),
});

export const getUserProfileResponseSchema = userProfileResponseSchema.pick({
  id: true,
  name: true,
  cover: true,
  avatar: true,
  username: true,
});
export const getUserProfileErrorResponseSchema = z.discriminatedUnion("type", [
  resourceNotFoundErrorResponseSchema,
  forbiddenErrorResponseSchema,
  unauthorizedErrorResponseSchema,
]);

export type GetUserProfileParamsSchema = z.infer<
  typeof getUserProfileParamsSchema
>;
export type GetUserProfileQueriesSchema = z.infer<
  typeof getUserProfileQueriesSchema
>;
export type GetUserProfileResponseSchema = z.infer<
  typeof getUserProfileResponseSchema
>;
export type GetUserProfileErrorResponseSchema = z.infer<
  typeof getUserProfileErrorResponseSchema
>;

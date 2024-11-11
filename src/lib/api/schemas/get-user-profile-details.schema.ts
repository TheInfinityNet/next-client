import { z } from "zod";
import {
  forbiddenErrorResponseSchema,
  resourceNotFoundErrorResponseSchema,
  unauthorizedErrorResponseSchema,
} from "./error.schema";
import { userProfileResponseSchema } from "./profile.schema";

export const getUserProfileDetailsParamsSchema = z.object({
  userId: z.string(),
});
export const getUserProfileDetailsQueriesSchema = z.object({
  include: z.array(z.enum(["coverPhoto", "avatarPhoto"])).optional(),
});

export const getUserProfileDetailsResponseSchema = userProfileResponseSchema.pick({
  id: true,
  name: true,
  cover: true,
  avatar: true,
  username: true,
  status: true,
});
export const getUserProfileDetailsErrorResponseSchema = z.discriminatedUnion("type", [
  resourceNotFoundErrorResponseSchema,
  forbiddenErrorResponseSchema,
  unauthorizedErrorResponseSchema,
]);

export type GetUserProfileDetailsParamsSchema = z.infer<
  typeof getUserProfileDetailsParamsSchema
>;
export type GetUserProfileDetailsQueriesSchema = z.infer<
  typeof getUserProfileDetailsQueriesSchema
>;
export type GetUserProfileDetailsResponseSchema = z.infer<
  typeof getUserProfileDetailsResponseSchema
>;
export type GetUserProfileDetailsErrorResponseSchema = z.infer<
  typeof getUserProfileDetailsErrorResponseSchema
>;

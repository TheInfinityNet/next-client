import { z } from "zod";
import {
  forbiddenErrorResponseSchema,
  resourceNotFoundErrorResponseSchema,
  unauthorizedErrorResponseSchema,
} from "./error.schema";
import { metadataPhotoResponseSchema } from "./metadata.schema";
import { userProfileStatusSchema } from "./user-profile.schema";

export const getUserProfileParamsSchema = z.object({
  userId: z.string(),
});
export const getUserProfileQueriesSchema = z.object({
  include: z.array(z.enum(["coverPhoto", "avatarPhoto"])).optional(),
});

export const getUserProfileResponseSchema = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  username: z.string(),
  name: z.string(),
  coverPhoto: z.lazy(() => metadataPhotoResponseSchema).optional(),
  avatarPhoto: z.lazy(() => metadataPhotoResponseSchema).optional(),
  status: z.lazy(() => userProfileStatusSchema),
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

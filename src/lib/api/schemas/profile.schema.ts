import { z } from "zod";
import { photoMetadataResponseSchema } from "./metadata.schema";

export const profileStatus = z.enum([
  "Active",
  "Inactive",
  "Locked",
  "Deleted",
]);
export const baseProfileSchema = z.object({
  id: z.coerce.string().uuid(),
  accountId: z.coerce.string().uuid(),
  avatarId: z.coerce.string().uuid().optional(),
  coverId: z.coerce.string().uuid().optional(),
  type: z.enum(["User", "Page"]),
  username: z.coerce.string(),
  name: z.coerce.string(),
  mobileNumber: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
  status: profileStatus,
});

export const userProfileSchema = baseProfileSchema.extend({
  type: z.literal("User"),
  birthdate: z.string().datetime(),
});

export const pageProfileSchema = baseProfileSchema.extend({
  type: z.literal("Page"),
  description: z.string(),
});

export const profileSchema = z.discriminatedUnion("type", [
  userProfileSchema,
  pageProfileSchema,
]);

export const baseProfileRequestSchema = baseProfileSchema
  .omit({
    id: true,
    accountId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .partial({
    coverId: true,
    avatarId: true,
  });
export const userProfileRequestSchema = baseProfileRequestSchema.extend({
  type: z.literal("User"),
  birthdate: z.string().datetime(),
});
export const pageProfileRequestSchema = baseProfileRequestSchema.extend({
  type: z.literal("Page"),
  description: z.string(),
});
export const profileRequestSchema = z.discriminatedUnion("type", [
  userProfileRequestSchema,
  pageProfileRequestSchema,
]);

export const baseProfileResponseSchema = baseProfileSchema
  .omit({
    avatarId: true,
    coverId: true,
  })
  .extend({
    avatar: photoMetadataResponseSchema.optional(),
    cover: photoMetadataResponseSchema.optional(),
  });
export const userProfileResponseSchema = baseProfileResponseSchema.extend({
  type: z.literal("User"),
  birthdate: z.string().datetime(),
});
export const pageProfileResponseSchema = baseProfileResponseSchema.extend({
  type: z.literal("Page"),
  description: z.string(),
});

export const uploadPhotoProfileRequestSchema = z.object({
  photoId: z.string().uuid(),
});

export const uploadPhotoProfileResponseSchema = z.object({
  message: z.string(),
});

export type UploadPhotoProfileRequestSchema = z.infer<
    typeof uploadPhotoProfileRequestSchema
>;

export type UploadPhotoProfileResponseSchema = z.infer<
    typeof uploadPhotoProfileResponseSchema
>;

export type BaseProfileResponseSchema = z.infer<
    typeof baseProfileResponseSchema
>;

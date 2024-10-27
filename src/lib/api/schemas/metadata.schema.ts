import { z } from "zod";
import { baseProfileSchema } from "./profile.schema";

export const baseMetadataSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  type: z.enum(["Photo", "Video", "Audio", "File"]),
  size: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().optional(),
  url: z.string().url(),
});
const baseMetadataPhotoSpecificSchema = z.object({
  type: z.literal("Photo"),
  width: z.number(),
  height: z.number(),
});
const baseMetadataVideoSpecificSchema = z.object({
  type: z.literal("Video"),
  thumbnailId: z.string().uuid(),
  duration: z.number(),
  width: z.number(),
  height: z.number(),
});
const baseMetadataAudioSpecificSchema = z.object({
  type: z.literal("Audio"),
  duration: z.number(),
});
const baseMetadataFileSpecificSchema = z.object({
  type: z.literal("File"),
  filename: z.string(),
  mimeType: z.string(),
});
export const photoMetadataSchema = baseMetadataSchema.merge(
  baseMetadataPhotoSpecificSchema,
);
export const videoMetadataSchema = baseMetadataSchema.merge(
  baseMetadataVideoSpecificSchema,
);
export const audioMetadataSchema = baseMetadataSchema.merge(
  baseMetadataAudioSpecificSchema,
);
export const fileMetadataSchema = baseMetadataSchema.merge(
  baseMetadataFileSpecificSchema,
);
export const metadataSchema = z.discriminatedUnion("type", [
  photoMetadataSchema,
  videoMetadataSchema,
  audioMetadataSchema,
  fileMetadataSchema,
]);

export const baseMetadataResponseSchema = baseMetadataSchema
  .omit({
    ownerId: true,
  })
  .extend({
    owner: baseProfileSchema
      .pick({
        id: true,
        type: true,
      })
      .optional(),
  });
export const photoMetadataResponseSchema = baseMetadataResponseSchema.merge(
  baseMetadataPhotoSpecificSchema,
);
export const videoMetadataResponseSchema = baseMetadataResponseSchema.merge(
  baseMetadataVideoSpecificSchema,
);
export const audioMetadataResponseSchema = baseMetadataResponseSchema.merge(
  baseMetadataAudioSpecificSchema,
);
export const fileMetadataResponseSchema = baseMetadataResponseSchema.merge(
  baseMetadataFileSpecificSchema,
);
export const metadataResponseSchema = z.discriminatedUnion("type", [
  photoMetadataResponseSchema,
  videoMetadataResponseSchema,
  audioMetadataResponseSchema,
  fileMetadataResponseSchema,
]);
export const baseMetadataTemporarilyResponseSchema =
  baseMetadataResponseSchema.extend({
    expiresAt: z.string().datetime(),
    temporary: z.literal(true),
  });

export const photoMetadataTemporarilyResponseSchema =
  baseMetadataTemporarilyResponseSchema.merge(baseMetadataPhotoSpecificSchema);
export const videoMetadataTemporarilyResponseSchema =
  baseMetadataTemporarilyResponseSchema.merge(baseMetadataVideoSpecificSchema);
export const audioMetadataTemporarilyResponseSchema =
  baseMetadataTemporarilyResponseSchema.merge(baseMetadataAudioSpecificSchema);
export const fileMetadataTemporarilyResponseSchema =
  baseMetadataTemporarilyResponseSchema.merge(baseMetadataFileSpecificSchema);
export const metadataTemporarilyResponseSchema = z.discriminatedUnion("type", [
  photoMetadataTemporarilyResponseSchema,
  videoMetadataTemporarilyResponseSchema,
  audioMetadataTemporarilyResponseSchema,
  fileMetadataTemporarilyResponseSchema,
]);
export type MetadataPhotoResponseSchema = z.infer<
  typeof photoMetadataResponseSchema
>;

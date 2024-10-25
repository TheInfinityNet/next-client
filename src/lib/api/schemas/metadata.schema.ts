import { z } from "zod";

export const metadataResponseSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  size: z.number(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
  url: z.string().url(),
});
export const metadataThumbnailResponseSchema = metadataResponseSchema.extend({
  type: z.literal("Thumbnail"),
  width: z.number(),
  height: z.number(),
});
export const metadataPhotoResponseSchema = metadataResponseSchema.extend({
  type: z.literal("Photo"),
  width: z.number(),
  height: z.number(),
  thumbnailId: z.string().uuid().optional(),
  thumbnail: metadataThumbnailResponseSchema.optional(),
});
export const metadataVideoResponseSchema = metadataResponseSchema.extend({
  type: z.literal("Video"),
  thumbnailId: z.string().uuid().optional(),
  thumbnail: metadataThumbnailResponseSchema.optional(),
  duration: z.number(),
  width: z.number(),
  height: z.number(),
});
export const metadataAudioResponseSchema = metadataResponseSchema.extend({
  type: z.literal("Audio"),
  duration: z.number(),
});
export const metadataFileResponseSchema = metadataResponseSchema.extend({
  type: z.literal("File"),
  filename: z.string(),
  mimeType: z.string(),
});
export const metadataTemporarilyResponseSchema = metadataResponseSchema.extend({
  temporary: z.literal(true),
  expiresAt: z.string().datetime(),
});
export const metadataTemporarilyThumbnailResponseSchema =
  metadataTemporarilyResponseSchema.merge(metadataThumbnailResponseSchema);
export const metadataTemporarilyPhotoResponseSchema =
  metadataTemporarilyResponseSchema.merge(metadataPhotoResponseSchema);
export const metadataTemporarilyVideoResponseSchema =
  metadataTemporarilyResponseSchema.merge(metadataVideoResponseSchema);
export const metadataTemporarilyAudioResponseSchema =
  metadataTemporarilyResponseSchema.merge(metadataAudioResponseSchema);
export const metadataTemporarilyFileResponseSchema =
  metadataTemporarilyResponseSchema.merge(metadataFileResponseSchema);

export type MetadataResponseSchema = z.infer<typeof metadataResponseSchema>;
export type MetadataThumbnailResponseSchema = z.infer<
  typeof metadataThumbnailResponseSchema
>;
export type MetadataPhotoResponseSchema = z.infer<
  typeof metadataPhotoResponseSchema
>;
export type MetadataVideoResponseSchema = z.infer<
  typeof metadataVideoResponseSchema
>;
export type MetadataAudioResponseSchema = z.infer<
  typeof metadataAudioResponseSchema
>;
export type MetadataFileResponseSchema = z.infer<
  typeof metadataFileResponseSchema
>;
export type MetadataTemporarilyResponseSchema = z.infer<
  typeof metadataTemporarilyResponseSchema
>;
export type MetadataTemporarilyThumbnailResponseSchema = z.infer<
  typeof metadataTemporarilyThumbnailResponseSchema
>;
export type MetadataTemporarilyPhotoResponseSchema = z.infer<
  typeof metadataTemporarilyPhotoResponseSchema
>;
export type MetadataTemporarilyVideoResponseSchema = z.infer<
  typeof metadataTemporarilyVideoResponseSchema
>;
export type MetadataTemporarilyAudioResponseSchema = z.infer<
  typeof metadataTemporarilyAudioResponseSchema
>;
export type MetadataTemporarilyFileResponseSchema = z.infer<
  typeof metadataTemporarilyFileResponseSchema
>;

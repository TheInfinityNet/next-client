// src/lib/api/schemas/group.schema.ts

import { z } from "zod";
import {
  forbiddenErrorResponseSchema,
  resourceNotFoundErrorResponseSchema,
  unauthorizedErrorResponseSchema,
} from "./error.schema";
import { photoMetadataResponseSchema } from "./metadata.schema";

export const groupVisibility = z.enum(["Public", "Private", "Hidden"]);
export const groupPrivacy = z.enum(["Open", "Closed"]);
export const groupActivityStatusSchema = z.object({
  newPostStatus: z.string().optional(),
  monthlyPostCount: z.number().optional(),
}).nullable();

export const coverImageSchema = photoMetadataResponseSchema.nullable();

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: photoMetadataResponseSchema.optional(),
});

export const baseGroupSchema = z.object({
  id: z.coerce.string().uuid(),
  name: z.string(),
  visibility: groupVisibility,
});

export const baseGroupResponseSchema = baseGroupSchema
  .extend({
    members: z.array(memberSchema),
    privacy: groupPrivacy,
    createdDate: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
    activityStatus: groupActivityStatusSchema,
    coverImage: coverImageSchema,
    membersCount: z.number(),
  });

export const baseGroupRequestSchema = baseGroupSchema
  .omit({
    id: true,
  }).partial();

export const getGroupProfileErrorResponseSchema = z.discriminatedUnion("type", [
  resourceNotFoundErrorResponseSchema,
  forbiddenErrorResponseSchema,
  unauthorizedErrorResponseSchema,
]);
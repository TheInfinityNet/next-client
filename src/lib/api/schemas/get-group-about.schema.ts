// src/lib/api/schemas/get-group-about.schema.ts

import * as z from "zod";
import {
  groupActivityStatusSchema,
  baseGroupResponseSchema,
  getGroupProfileErrorResponseSchema,
} from "./group.schema";

export const GetGroupAboutParamsSchema = z.object({
  groupId: z.string(),
});

export const GetGroupAboutResponseSchema = baseGroupResponseSchema
  .omit({
    coverImage: true,
  })
  .extend({
    totalMembers: z.number(),
    recentPosts: z.number(),
    recentMembers: z.number(),
    history: z.string(),
    description: z.string(),
    coverImage: z.string().url(),
  })

export const GetGroupAboutErrorResponseSchema = z.object({
  message: z.string(),
  type: z.string(),
});

export type GetGroupAboutParams = z.infer<typeof GetGroupAboutParamsSchema>;
export type GetGroupAboutResponse = z.infer<typeof GetGroupAboutResponseSchema>;
export type GetGroupAboutErrorResponse = z.infer<typeof GetGroupAboutErrorResponseSchema>;

// src/lib/api/schemas/get-group-about.schema.ts

import * as z from "zod";

export const GetGroupAboutParamsSchema = z.object({
  groupId: z.string(),
});

export const GetGroupAboutResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  privacy: z.string(),
  visibility: z.string(),
  createdDate: z.string(),
  totalMembers: z.number(),
  recentPosts: z.number(),
  recentMembers: z.number(),
  history: z.string(),
  description: z.string(),
  coverImage: z.string().url(),
});

export const GetGroupAboutErrorResponseSchema = z.object({
  message: z.string(),
  type: z.string(),
});

export type GetGroupAboutParams = z.infer<typeof GetGroupAboutParamsSchema>;
export type GetGroupAboutResponse = z.infer<typeof GetGroupAboutResponseSchema>;
export type GetGroupAboutErrorResponse = z.infer<typeof GetGroupAboutErrorResponseSchema>;

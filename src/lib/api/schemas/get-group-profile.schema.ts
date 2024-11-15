// src/lib/api/schemas/get-group-profile.schema.ts

import { z } from "zod";
import {
  groupActivityStatusSchema,
  baseGroupResponseSchema,
  getGroupProfileErrorResponseSchema,
} from "./group.schema";

export const getGroupProfileParamsSchema = z.object({
  groupId: z.string(),
});

export const getGroupProfileQueriesSchema = z.object({
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});

export const getGroupProfileResponseSchema = baseGroupResponseSchema;

export type GetGroupProfileParamsSchema = z.infer<typeof getGroupProfileParamsSchema>;
export type GetGroupProfileQueriesSchema = z.infer<typeof getGroupProfileQueriesSchema>;
export type GetGroupProfileResponseSchema = z.infer<typeof getGroupProfileResponseSchema>;
export type GetGroupProfileErrorResponseSchema = z.infer<typeof getGroupProfileErrorResponseSchema>;

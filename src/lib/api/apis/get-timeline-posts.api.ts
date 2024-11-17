import { z } from "zod";

import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";
import { postResponseSchema } from "../schemas/post.schema";

export const getTimelinePostsQuerySchema = z.object({
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});

export const getTimelinePostsResponseSchema = z.object({
  items: z.array(postResponseSchema),
  nextCursor: z.string().optional(),
});

export const getTimelinePostsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);

export type GetTimelinePostsQuerySchema = z.infer<
  typeof getTimelinePostsQuerySchema
>;
export type GetTimelinePostsResponseSchema = z.infer<
  typeof getTimelinePostsResponseSchema
>;
export type GetTimelinePostsErrorResponseSchema = z.infer<
  typeof getTimelinePostsErrorResponseSchema
>;
export async function getTimelinePostsApi(
  query?: GetTimelinePostsQuerySchema,
): Promise<GetTimelinePostsResponseSchema> {
  const response = await apiClient.get<GetTimelinePostsResponseSchema>(
    "/posts/timeline",
    query,
  );
  return response.data;
}

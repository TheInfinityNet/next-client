import { z } from "zod";
import { apiClient } from "../client";
import { unauthorizedErrorResponseSchema } from "../schemas/error.schema";
import { InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";
import { commentResponseSchema } from "../schemas/comment.schema";

export const getCommentsParamsSchema = z
  .object({
    postId: z.string().optional(),
    commentId: z.string().optional(),
  })
  .refine((data) => {
    return data.postId || data.commentId;
  });

export const getCommentsQuerySchema = z.object({
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
});

export const getCommentsResponseSchema = z.object({
  items: z.array(commentResponseSchema),
  nextCursor: z.string().optional(),
});

export const getCommentsErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);

export type GetCommentsParamsSchema = z.infer<typeof getCommentsParamsSchema>;
export type GetCommentsQuerySchema = z.infer<typeof getCommentsQuerySchema>;
export type GetCommentsResponseSchema = z.infer<
  typeof getCommentsResponseSchema
>;
export type GetCommentsErrorResponseSchema = z.infer<
  typeof getCommentsErrorResponseSchema
>;

export async function getCommentsApi(
  params: GetCommentsParamsSchema,
  query?: GetCommentsQuerySchema,
): Promise<GetCommentsResponseSchema> {
  if (params.postId) {
    const response = await apiClient.get<GetCommentsResponseSchema>(
      `/posts/${params.postId}/comments`,
      query,
    );
    return response.data;
  } else if (params.commentId) {
    const response = await apiClient.get<GetCommentsResponseSchema>(
      `/comments/${params.commentId}/replies`,
      query,
    );
    return response.data;
  } else {
    throw new Error("Either postId or commentId must be provided");
  }
}

export function createGetCommentsInfinityQueryOptions(
  params: GetCommentsParamsSchema,
  query?: GetCommentsQuerySchema,
) {
  const queryKey = ["comments", params];

  return infiniteQueryOptions<
    GetCommentsResponseSchema,
    GetCommentsErrorResponseSchema,
    InfiniteData<GetCommentsResponseSchema>,
    typeof queryKey,
    string | null
  >({
    queryKey,
    queryFn: ({ pageParam }) =>
      getCommentsApi(params, {
        ...query,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
}

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {GetPostParamsSchema, PostResponseSchema} from "@/lib/api/schemas/post.schema";
import {getPostApi} from "@/lib/api/apis/get-post.api";

export function createPostQueryOptions(
  params: GetPostParamsSchema,
) {
  return queryOptions<
    PostResponseSchema
  >({
    queryKey: ["post", params],
    queryFn: () => getPostApi(params),
    throwOnError: (error) => isAxiosError(error),
    retry: 1,
  });
}

export function useGetPostQuery(
  params: GetPostParamsSchema,
) {
  return useSuspenseQuery(createPostQueryOptions(params));
}

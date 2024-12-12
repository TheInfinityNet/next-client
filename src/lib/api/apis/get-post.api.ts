import { apiClient } from "../client";
import {GetPostParamsSchema, PostResponseSchema} from "@/lib/api/schemas/post.schema";

export async function getPostApi(
    params: GetPostParamsSchema,
): Promise<PostResponseSchema> {
  const response = await apiClient.get<
      PostResponseSchema
  >(`/posts/${params.id}`, {
  });
  return response.data;
}

import { apiClient } from "../client";
import {GetPostActionsParamsSchema, GetPostActionsResponseSchema} from "@/lib/api/schemas/get-post-actions.schema";

export async function getPostActionsApi(
  params: GetPostActionsParamsSchema,
): Promise<GetPostActionsResponseSchema> {
  const response = await apiClient.get<GetPostActionsResponseSchema>(
    `/posts/${params.postId}/actions`,
  );
  return response.data;
}

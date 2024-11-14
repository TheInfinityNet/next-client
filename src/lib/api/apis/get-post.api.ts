import { apiClient } from "../client";
import { postSchema } from "../schemas/post.schema";

export async function getPostById(postId: string): Promise<typeof postSchema | null> {
  try {
    const response = await apiClient.get<typeof postSchema>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return null;
  }
}
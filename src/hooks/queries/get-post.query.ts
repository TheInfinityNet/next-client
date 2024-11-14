import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/lib/api/apis/get-post.api";
import { GetPostResponseSchema } from "@/lib/api/schemas/get-post.schema";

export function useGetPostQuery(postId: string) {
  return useQuery<GetPostResponseSchema, Error>({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });
}
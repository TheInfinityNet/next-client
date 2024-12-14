import { useMutation } from "@tanstack/react-query";
import {deletePostApi} from "@/lib/api/apis/delete-post.api";
import {GetPostParamsSchema} from "@/lib/api/schemas/post.schema";
import {CreatePostResponseSchema} from "@/lib/api/apis/create-post.api";

export function useDeletePostMutation() {
  return useMutation<
      CreatePostResponseSchema,
      null,
      GetPostParamsSchema
  >({
    mutationKey: ["delete-post"],
    mutationFn: (params) => deletePostApi(params),
  });
}

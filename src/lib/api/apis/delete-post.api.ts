import {apiClient} from "@/lib/api/client";
import {GetPostParamsSchema} from "@/lib/api/schemas/post.schema";
import {CreatePostResponseSchema} from "@/lib/api/apis/create-post.api";

export async function deletePostApi(param: GetPostParamsSchema) {
    const response = await apiClient.delete<CreatePostResponseSchema>(
        `/posts/${param.id}`,
    );
    return response.data;
}

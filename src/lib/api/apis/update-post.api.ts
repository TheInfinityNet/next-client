import { z } from "zod";
import { postRequestSchema } from "../schemas/post.schema";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../client";
import {isAxiosError} from "axios";
import {forbiddenErrorResponseSchema, validationErrorResponseSchema} from "@/lib/api/schemas/error.schema";

export const updatePostBodySchema = postRequestSchema;
export type UpdatePostBodySchema = z.infer<typeof updatePostBodySchema>;

export const updatePostParamsSchema = z.object({
    id: z.string(),
});

export type UpdatePostParamsSchema = z.infer<
    typeof updatePostParamsSchema
>;

export const updatePostResponseSchema = z.object({
    id: z.string().uuid(),
});

export type UpdatePostResponseSchema = z.infer<typeof updatePostResponseSchema>;

export const updatePostErrorResponseSchema = z.discriminatedUnion("type", [
    validationErrorResponseSchema,
    forbiddenErrorResponseSchema
]);
export type UpdatePostErrorResponseSchema = z.infer<
    typeof updatePostErrorResponseSchema
>;

export async function updatePostApi(
    params: UpdatePostParamsSchema,
    body: UpdatePostBodySchema
) {
    const response = await apiClient.put<UpdatePostResponseSchema>(
        `/posts/${params.id}`,
        body,
    );
    return response.data;
}

export function useUpdatePostMutation(params: UpdatePostParamsSchema) {
    return useMutation<
        UpdatePostResponseSchema,
        UpdatePostErrorResponseSchema,
        UpdatePostBodySchema
    >({
        mutationKey: ["update-post"],
        mutationFn: (body) => updatePostApi(params, body),
        throwOnError: (error) => isAxiosError(error),
    });
}

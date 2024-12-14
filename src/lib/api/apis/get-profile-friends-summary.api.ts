import {
    GetUserProfileParamsSchema,
} from "@/lib/api/schemas/get-user-profile.schema";
import {apiClient} from "@/lib/api/client";
import {ProfileFriendsSummaryPreviewResponseSchema} from "@/lib/api/schemas/user-profile.schema";

export async function getProfileFriendsSummaryApi(
    params: GetUserProfileParamsSchema,
): Promise<ProfileFriendsSummaryPreviewResponseSchema> {
    const response = await apiClient.get<
        ProfileFriendsSummaryPreviewResponseSchema
    >(`/profiles/users/${params.userId}/mutual-friends`);
    return response.data;
}
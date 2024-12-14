import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {getProfileFriendsSummaryApi} from "@/lib/api/apis/get-profile-friends-summary.api";
import {ProfileFriendsSummaryPreviewResponseSchema} from "@/lib/api/schemas/user-profile.schema";
import {GetUserProfileParamsSchema} from "@/lib/api/schemas/get-user-profile.schema";

export function createGetProfileFriendsSummaryQueryOptions(
    params: GetUserProfileParamsSchema,
) {
    return queryOptions<
        ProfileFriendsSummaryPreviewResponseSchema
    >({
        queryKey: ["profile-friends-summary", params],
        queryFn: () => getProfileFriendsSummaryApi(params),
        throwOnError: (error) => isAxiosError(error),
        retry: 1,
    });
}

export function useGetUserProfileQuery(
    params: GetUserProfileParamsSchema,
) {
    return useSuspenseQuery(createGetProfileFriendsSummaryQueryOptions(params));
}

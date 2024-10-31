import { apiClient } from "../client";
import {
  GetFriendRequestsQuerySchema,
  GetFriendRequestsResponseSchema,
} from "../schemas/get-friend-requests.schema";

export async function getFriendRequestsApi(
  query?: GetFriendRequestsQuerySchema,
): Promise<GetFriendRequestsResponseSchema> {
  const response = await apiClient.get<GetFriendRequestsResponseSchema>(
    "/friends/requests",
    query,
  );
  return response.data;
}

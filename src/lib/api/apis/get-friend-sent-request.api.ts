import { apiClient } from "../client";
import {
  GetFriendSentRequestsQuerySchema,
  GetFriendSentRequestsResponseSchema,
} from "../schemas/get-friend-sent-requests.schema";

export async function getFriendSentRequestsApi(
  query?: GetFriendSentRequestsQuerySchema,
): Promise<GetFriendSentRequestsResponseSchema> {
  const response = await apiClient.get<GetFriendSentRequestsResponseSchema>(
    "/relationships/friends/sent-requests",
    query,
  );
  return response.data;
}

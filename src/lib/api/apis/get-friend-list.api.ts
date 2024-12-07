import { apiClient } from "../client";
import {
  GetFriendListQuerySchema,
  GetFriendListResponseSchema,
} from "../schemas/get-friend-list.schema";

export async function getFriendListApi(
  query?: GetFriendListQuerySchema,
): Promise<GetFriendListResponseSchema> {
  const response = await apiClient.get<GetFriendListResponseSchema>(
    "/relationships/friends",
    query,
  );
  return response.data;
}

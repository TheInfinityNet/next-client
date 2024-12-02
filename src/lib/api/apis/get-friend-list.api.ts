import { apiClient } from "../client";
import {
  GetFriendListQuerySchema,
  GetFriendListResponseSchema,
} from "../schemas/get-friend-list.schema";

export async function getFriendListApi(
  query?: GetFriendListQuerySchema,
): Promise<GetFriendListResponseSchema> {
  const response = await apiClient.get<GetFriendListResponseSchema>(
    "/profiles/friends",
    query,
  );
  return response.data;
}

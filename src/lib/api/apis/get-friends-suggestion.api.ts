import { apiClient } from "../client";
import {
  GetFriendsSuggestionQuerySchema,
  GetFriendsSuggestionResponseSchema,
} from "../schemas/get-friends-suggestion.schema";

export async function getFriendsSuggestionApi(
  query?: GetFriendsSuggestionQuerySchema,
): Promise<GetFriendsSuggestionResponseSchema> {
  const response = await apiClient.get<GetFriendsSuggestionResponseSchema>(
    "/friends/suggestions",
    query,
  );
  return response.data;
}

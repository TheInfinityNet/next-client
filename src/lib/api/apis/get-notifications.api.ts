import { apiClient } from "../client";
import {
  GetNotificationsQuerySchema,
  GetNotificationsResponseSchema,
} from "./../schemas/get-notifications.schema";

export async function getNotificationsApi(
  query?: GetNotificationsQuerySchema
): Promise<GetNotificationsResponseSchema> {
  const response = await apiClient.get<GetNotificationsResponseSchema>(
    "/notifications",
    query
  );
  return response.data;
}

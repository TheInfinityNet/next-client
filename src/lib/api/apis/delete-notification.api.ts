import { apiClient } from "../client";
import {
  RemoveNotificationParamsSchema,
  RemoveNotificationResponseSchema,
} from "../schemas/delete-notification.schema";

export async function removeNotification(
  params: RemoveNotificationParamsSchema
): Promise<RemoveNotificationResponseSchema> {
  const response = await apiClient.delete<RemoveNotificationResponseSchema>(
    `/notifications/${params.notificationId}`
  );

  return response.data;
}

import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";
import {
  UpdateNotificationBodySchema,
  UpdateNotificationResponseSchema,
} from "../schemas/update-notification.schema";

export async function updateNotification(
  data: UpdateNotificationBodySchema,
  config?: AxiosRequestConfig<UpdateNotificationBodySchema>
): Promise<UpdateNotificationResponseSchema> {
  const response = await apiClient.put<
    UpdateNotificationResponseSchema,
    UpdateNotificationBodySchema
  >(`/notifications/update/${data.notificationId}`, data, config);

  return response.data;
}

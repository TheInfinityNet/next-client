import { updateNotification } from "@/lib/api/apis/update-notification.api";
import {
  UpdateNotificationBodySchema,
  UpdateNotificationErrorResponseSchema,
  UpdateNotificationResponseSchema,
} from "@/lib/api/schemas/update-notification.schema";
import { useMutation } from "@tanstack/react-query";

export function useNotificationReadStatusMutation() {
  return useMutation<
    UpdateNotificationResponseSchema,
    UpdateNotificationErrorResponseSchema,
    UpdateNotificationBodySchema
  >({
    mutationKey: ["notification-read"],
    mutationFn: (body) => updateNotification(body),
  });
}

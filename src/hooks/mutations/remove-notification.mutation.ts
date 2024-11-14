import { removeNotification } from "@/lib/api/apis/delete-notification.api";
import {
  RemoveNotificationErrorResponseSchema,
  RemoveNotificationParamsSchema,
  RemoveNotificationResponseSchema,
} from "@/lib/api/schemas/delete-notification.schema";
import { useMutation } from "@tanstack/react-query";

export function useRemoveNotificationMutation() {
  return useMutation<
    RemoveNotificationResponseSchema,
    RemoveNotificationErrorResponseSchema,
    RemoveNotificationParamsSchema
  >({
    mutationKey: ["remove-notification"],
    mutationFn: (params) => removeNotification(params),
  });
}

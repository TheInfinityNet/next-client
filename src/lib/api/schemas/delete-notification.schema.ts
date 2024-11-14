import { z } from "zod";

export const removeNotificationParamsSchema = z.object({
  notificationId: z.string(),
});

export type RemoveNotificationParamsSchema = z.infer<
  typeof removeNotificationParamsSchema
>;

export const removeNotificationResponseSchema = z.object({
  notificationId: z.string(),
  message: z.string(),
});

export type RemoveNotificationResponseSchema = z.infer<
  typeof removeNotificationResponseSchema
>;

export const removeNotificationErrorResponseSchema = z.object({
  message: z.string(),
});

export type RemoveNotificationErrorResponseSchema = z.infer<
  typeof removeNotificationErrorResponseSchema
>;

import { z } from "zod";

export const updateNotificationBodySchema = z.object({
  notificationId: z.string().uuid(),
  isRead: z.boolean(),
});

export type UpdateNotificationBodySchema = z.infer<
  typeof updateNotificationBodySchema
>;

export const updateNotificationResponseSchema = z.object({
  notificationId: z.string(),
  message: z.string(),
  isRead: z.boolean(),
});

export type UpdateNotificationResponseSchema = z.infer<
  typeof updateNotificationResponseSchema
>;

export const updateNotificationErrorResponseSchema = z.object({
  message: z.string(),
});

export type UpdateNotificationErrorResponseSchema = z.infer<
  typeof updateNotificationErrorResponseSchema
>;

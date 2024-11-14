import { z } from "zod";
import { unauthorizedErrorResponseSchema } from "./error.schema";
import { notificationResponseSchema } from "./notification.schema";

export const getNotificationsQuerySchema = z.object({
  cursor: z.string().nullable().optional(),
  limit: z.number().optional(),
  type: z.enum(["All", "Unread", "Mention"]),
});
export const getNotificationsResponseSchema = z.object({
  items: z.array(notificationResponseSchema),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

export const getNotificationRequestsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema]
);

export type GetNotificationsQuerySchema = z.infer<
  typeof getNotificationsQuerySchema
>;

export type GetNotificationsResponseSchema = z.infer<
  typeof getNotificationsResponseSchema
>;

export type GetNotificationRequestsErrorResponseSchema = z.infer<
  typeof getNotificationRequestsErrorResponseSchema
>;

import { z } from "zod";
import { groupActionsSchema } from "./groupAction.schema";

export const getGroupActionsParamsSchema = z.object({
  groupId: z.coerce.string().uuid(),
});
export const getGroupActionsResponseSchema = z.record(
  groupActionsSchema,
  z.boolean(),
);
export type GetGroupActionsParamsSchema = z.infer<
  typeof getGroupActionsParamsSchema
>;
export type GetGroupActionsResponseSchema = z.infer<
  typeof getGroupActionsResponseSchema
>;

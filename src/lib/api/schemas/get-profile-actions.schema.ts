import { z } from "zod";
import { profileActionsSchema } from "./action.schema";

export const getProfileActionsParamsSchema = z.object({
  profileId: z.coerce.string().uuid(),
});
export const getProfileActionsResponseSchema = z.record(
  profileActionsSchema,
  z.boolean(),
);
export type GetProfileActionsParamsSchema = z.infer<
  typeof getProfileActionsParamsSchema
>;
export type GetProfileActionsResponseSchema = z.infer<
  typeof getProfileActionsResponseSchema
>;

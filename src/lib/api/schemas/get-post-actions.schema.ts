import { z } from "zod";
import {postActionsSchema} from "./action.schema";

export const getPostActionsParamsSchema = z.object({
  postId: z.coerce.string().uuid(),
});
export const getPostActionsResponseSchema = z.record(
  postActionsSchema,
  z.boolean(),
);
export type GetPostActionsParamsSchema = z.infer<
  typeof getPostActionsParamsSchema
>;
export type GetPostActionsResponseSchema = z.infer<
  typeof getPostActionsResponseSchema
>;

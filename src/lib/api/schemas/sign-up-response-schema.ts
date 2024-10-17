import { z } from "zod";

export const signUpResponseSchema = z.object({
  message: z.string(),
});
export type SignUpResponseSchema = z.infer<typeof signUpResponseSchema>;

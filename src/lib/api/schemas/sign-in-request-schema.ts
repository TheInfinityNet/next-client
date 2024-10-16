import { z } from "zod";

export const signInRequestSchema = z.object({
  email: z.coerce.string().email().min(1),
  password: z.coerce.string().min(6).max(20),
});

export type SignInRequestSchema = z.infer<typeof signInRequestSchema>;

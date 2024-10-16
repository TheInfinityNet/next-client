import { z } from "zod";

export const tokensResponseSchema = z.object({
  accessToken: z.coerce.string(),
  refreshToken: z.coerce.string(),
});
export type TokensResponseSchema = z.infer<typeof tokensResponseSchema>;

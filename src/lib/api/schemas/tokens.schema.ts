import { z } from "zod";

export const accessTokenSchema = z.coerce.string();
export const refreshTokenSchema = z.coerce.string();
export const tokensResponseSchema = z.object({
  accessToken: z.coerce.string(),
  refreshToken: z.coerce.string(),
});

export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
export type TokensResponseSchema = z.infer<typeof tokensResponseSchema>;

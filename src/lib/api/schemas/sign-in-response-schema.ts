import { z } from "zod";
import { tokensResponseSchema } from "./tokens-response-schema";
import { userProfileResponseSchema } from "./user-profile-response-schema";

export const signInResponseSchema = z.object({
  tokens: z.lazy(() => tokensResponseSchema),
  user: z.lazy(() => userProfileResponseSchema),
});
export type SignInResponseSchema = z.infer<typeof signInResponseSchema>;

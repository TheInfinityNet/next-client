import { z } from "zod";

export const baseProviderSchema = z.object({
  id: z.coerce.string().uuid(),
  type: z.enum(["Local", "Google", "Facebook"]),
});

export const localProviderSchema = baseProviderSchema.extend({
  type: z.literal("Local"),
  email: z.string(),
  password: z.string(),
});

export const googleProviderSchema = baseProviderSchema.extend({
  type: z.literal("Google"),
  googleId: z.string(),
});

export const facebookProviderSchema = baseProviderSchema.extend({
  type: z.literal("Facebook"),
  facebookId: z.string(),
});

export const providerSchema = z.discriminatedUnion("type", [
  localProviderSchema,
  googleProviderSchema,
  facebookProviderSchema,
]);

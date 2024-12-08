import { apiClient } from "../client";
import { SocialSignInResponseSchema} from "@/lib/api/schemas/social.schema";
import {z} from "zod";

export const socialSignInQuerySchema = z.object({
  provider: z.enum(["Google", "Facebook"]),
});

export type SocialSignInQuerySchema = z.infer<
    typeof socialSignInQuerySchema
>;

export async function socialSignInApi(
  query: SocialSignInQuerySchema
): Promise<SocialSignInResponseSchema> {
  const response = await apiClient.get<SocialSignInResponseSchema>(
      '/auth/social',
      query,
  );
  return response.data;
}

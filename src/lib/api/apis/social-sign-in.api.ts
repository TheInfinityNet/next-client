import { apiClient } from "../client";
import { SocialSignInResponseSchema} from "@/lib/api/schemas/social.schema";
import {z} from "zod";

export const socialSignInParamsSchema = z.object({
  provider: z.enum(["Google", "Facebook"]),
});

export type SocialSignInParamsSchema = z.infer<
    typeof socialSignInParamsSchema
>;

export async function socialSignInApi(
  params: SocialSignInParamsSchema
): Promise<SocialSignInResponseSchema> {
  const response = await apiClient.get<SocialSignInResponseSchema>(
      `/auth/social/${params.provider}`
  );
  return response.data;
}

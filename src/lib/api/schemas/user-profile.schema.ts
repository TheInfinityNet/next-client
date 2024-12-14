import { z } from "zod";
import {baseProfileResponseSchema} from "@/lib/api/schemas/profile.schema";

export const userProfileStatusSchema = z.enum([
  "Active",
  "Inactive",
  "Locked",
  "Deleted",
]);

export const userProfileResponseSchema = z.object({
  id: z.coerce.string().uuid(),
  accountId: z.coerce.string().uuid(),
  email: z.coerce.string().optional(),
  username: z.coerce.string().optional(),
  firstName: z.coerce.string().optional(),
  middleName: z.coerce.string().optional(),
  lastName: z.coerce.string().optional(),
  mobileNumber: z.coerce.string().optional(),
  birthdate: z.string().datetime().optional(),
  gender: z.coerce.string().optional(),
});

export const profileFriendsSummaryPreviewSchema = z.object({
  items: z.array(baseProfileResponseSchema).optional(),
});

export type ProfileFriendsSummaryPreviewResponseSchema = z.infer<
  typeof profileFriendsSummaryPreviewSchema
>;

export type UserProfileResponseSchema = z.infer<
    typeof userProfileResponseSchema
>;

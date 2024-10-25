import { z } from "zod";

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
export type UserProfileResponseSchema = z.infer<
  typeof userProfileResponseSchema
>;

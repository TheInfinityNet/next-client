import { z } from "zod";
import { genderSchema } from "./gender-schema";

export const signUpRequestSchema = z
  .object({
    firstName: z.coerce.string().min(1).max(100),
    middleName: z.coerce.string().max(100).optional(),
    lastName: z.coerce.string().min(1).max(100),
    email: z.coerce.string().email().min(1),
    password: z.coerce.string().min(6).max(20),
    passwordConfirmation: z.coerce.string().min(6).max(20),
    mobileNumber: z.coerce.string().min(1).max(20),
    birthdate: z.string().date(),
    gender: z.lazy(() => genderSchema).default("Other"),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
  .refine((data) => data.acceptTerms, {
    message: "You must accept the terms and conditions",
    path: ["acceptTerms"],
  });
export type SignUpRequestSchema = z.infer<typeof signUpRequestSchema>;

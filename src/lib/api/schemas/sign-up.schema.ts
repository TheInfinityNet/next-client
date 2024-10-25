import { z } from "zod";
import { genderSchema } from "./gender.schema";
import { validationErrorResponseSchema } from "./error.schema";

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
export const signUpResponseSchema = z.object({
  message: z.string(),
});
export const signUpErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);

export type SignUpResponseSchema = z.infer<typeof signUpResponseSchema>;
export type SignUpRequestSchema = z.infer<typeof signUpRequestSchema>;
export type SignUpErrorResponseSchema = z.infer<
  typeof signUpErrorResponseSchema
>;

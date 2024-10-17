import { z } from "zod";

export const genderSchema = z.enum(["Male", "Female", "Other"]);
export type GenderSchema = z.infer<typeof genderSchema>;

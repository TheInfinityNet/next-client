import { z } from "zod";

export const profileActionsSchema = z.enum([
  "ProfileCoverPhotoUpload",
  "ProfileCoverPhotoDelete",
]);

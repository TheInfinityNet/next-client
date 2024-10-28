import { z } from "zod";

export const profileActionsSchema = z.enum([
  "ProfileCoverPhotoUpload",
  "ProfileCoverPhotoDelete",
  "ProfileAvatarUpload",
  "ProfileAvatarDelete",
  "ProfileDetailsUpdate",
  "ProfilePostSearch",
  "ProfilePostCreate",
  "ProfileActivityLog",
  "ProfileStatusLock",
  "ProfileReport",
  "ProfileDelete",
  "ProfileCreate",
]);

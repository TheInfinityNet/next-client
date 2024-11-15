import { z } from "zod";

export const groupActionsSchema = z.enum([
  "GroupCoverPhotoUpload",
  "GroupCoverPhotoDelete",
  "GroupDetailsUpdate",
  "GroupPostSearch",
  "GroupPostCreate",
  "GroupPostDelete",
  "GroupActivityUpdate",
  "GroupStatusLock",
  "GroupReport",
  "GroupDelete",
  "GroupCreate",
]);

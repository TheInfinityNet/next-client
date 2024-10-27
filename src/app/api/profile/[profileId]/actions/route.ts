import { GetProfileActionsResponseSchema } from "@/lib/api/schemas/get-profile-actions.schema";

export function GET() {
  return Response.json({
    ProfileCoverPhotoDelete: true,
    ProfileCoverPhotoUpload: true,
  } satisfies GetProfileActionsResponseSchema);
}

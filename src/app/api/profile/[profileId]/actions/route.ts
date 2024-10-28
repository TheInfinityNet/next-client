import { GetProfileActionsResponseSchema } from "@/lib/api/schemas/get-profile-actions.schema";

export async function GET() {
  return Response.json({
    ProfileCoverPhotoDelete: true,
    ProfileCoverPhotoUpload: true,
    ProfilePostSearch: true,
    ProfileDetailsUpdate: true,
    ProfileActivityLog: true,
    ProfileStatusLock: true,
    ProfileReport: true,
    ProfileDelete: true,
    ProfileCreate: true,
  } satisfies GetProfileActionsResponseSchema);
}

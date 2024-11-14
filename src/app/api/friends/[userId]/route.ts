import { RemoveFriendResponseSchema } from "@/lib/api/apis/delete-friend.api";
import { NextRequest } from "next/server";

type Params = { userId: string };

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  const { userId } = params;

  return Response.json({
    status: "NotConnected",
    message: "Removed friend",
    userId,
  } satisfies RemoveFriendResponseSchema);
}

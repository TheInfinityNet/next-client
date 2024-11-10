import { acceptFriendBodySchema } from "@/lib/api/apis/accept-friend.api";
import { AddFriendResponseSchema } from "@/lib/api/apis/add-friend.api";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { userId } = acceptFriendBodySchema.parse(await request.json());

  return Response.json({
    status: "Connected",
    message: "Friend request accepted",
    userId,
  } satisfies AddFriendResponseSchema);
}

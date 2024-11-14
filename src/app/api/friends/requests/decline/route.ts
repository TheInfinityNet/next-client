import {
  declineFriendBodySchema,
  DeclineFriendResponseSchema,
} from "@/lib/api/apis/decline-friend.api";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { userId } = declineFriendBodySchema.parse(await request.json());

  return Response.json({
    status: "NotConnected",
    message: "Friend request sent",
    userId,
  } satisfies DeclineFriendResponseSchema);
}

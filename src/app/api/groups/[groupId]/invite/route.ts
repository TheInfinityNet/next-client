import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  return Response.json({ message: "invite-friend-to-group" });
}

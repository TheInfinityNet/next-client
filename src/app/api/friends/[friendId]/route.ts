import { NextRequest } from "next/server";
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "remove-friend" });
}

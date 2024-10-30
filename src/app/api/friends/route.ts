import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  return Response.json({ message: "add-friend" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get-friend-list" });
}

import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({ message: "get-post-reactions" });
}
export async function POST(request: NextRequest) {
  return Response.json({ message: "reaction-post" });
}

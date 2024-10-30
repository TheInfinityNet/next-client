import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({ message: "get-user-profile" });
}
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update-user-profile" });
}

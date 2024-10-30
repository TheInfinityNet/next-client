import { NextRequest } from "next/server";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({ message: "get-profile-settings" });
}
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update-profile-settings" });
}

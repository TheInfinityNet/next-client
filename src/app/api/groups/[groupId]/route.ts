import { NextRequest } from "next/server";
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete-group" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get-group-details" });
}
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update-group" });
}

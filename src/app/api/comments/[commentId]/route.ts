import { NextRequest } from "next/server";
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete-comment" });
}
export async function PUT(request: NextRequest) {
  return Response.json({ message: "edit-comment" });
}

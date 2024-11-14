import { RemoveNotificationResponseSchema } from "@/lib/api/schemas/delete-notification.schema";
import { NextRequest } from "next/server";

type Params = {
  notificationId: string;
};

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  const { notificationId } = params;
  return Response.json({
    notificationId: notificationId,
    message: "deletedNotification",
  } satisfies RemoveNotificationResponseSchema);
}

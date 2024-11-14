import { UpdateNotificationResponseSchema } from "./../../../../../lib/api/schemas/update-notification.schema";
import { NextRequest } from "next/server";

type Params = {
  notificationId: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { notificationId } = params;
  const { isRead } = await request.json();

  return Response.json({
    notificationId: notificationId,
    message: "changeReadStatus",
    isRead: !isRead,
  } satisfies UpdateNotificationResponseSchema);
}

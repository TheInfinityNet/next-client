// src/app/api/groups/[groupId]/route.ts
import {
    GetGroupProfileErrorResponseSchema,
    GetGroupProfileParamsSchema,
    GetGroupProfileResponseSchema,
  } from "@/lib/api/schemas/get-group-profile.schema";
  import { HttpStatusCode } from "axios";
  import { faker } from "@faker-js/faker";
  
  export async function GET(
    request: Request,
    { params }: { params: { groupId: string } },
  ) {
    if (params.groupId === "1") {
      return Response.json(
        {
          id: "1",
          name: "Nhóm Dev Frontend",
          type: "Private",
          membersCount: 120,
          coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
          members: [
            { id: '1', name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: '2', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: '3', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: '4', name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: '5', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: '6', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?img=6' },
          ],
        },
        { status: HttpStatusCode.Ok },
      );
    }
    if (params.groupId === "2") {
      return Response.json(
        {
          id: "2",
          name: "Nhóm NextJs",
          type: "Public",
          membersCount: 8,
          coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
          members: [
            { id: '1', name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: '2', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: '3', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?img=6' },
          ],
        },
        { status: HttpStatusCode.Ok },
      );
    }
  
    return Response.json(
      {
        message: "Group not found",
        type: "NotFound",
      },
      { status: HttpStatusCode.NotFound },
    );
  }
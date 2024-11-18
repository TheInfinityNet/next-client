import { NextRequest } from "next/server";
import { HttpStatusCode } from "axios";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import { GetGroupProfileResponseSchema } from "@/lib/api/schemas/get-group-profile.schema";

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const groupId = pathname.split("/").pop();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (groupId === "1") {
    return Response.json({
      id: "1",
      name: "Nhóm Dev Frontend",
      visibility: "Public",
      membersCount: 120,
      createdDate: "2023-10-12",
      privacy: "Closed",
      activityStatus: {
        newPostStatus: "Active",
        monthlyPostCount: 15,
      },
      coverImage: {
        id: faker.string.uuid(),
        type: "Photo",
        size: 2048,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        url: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
        width: 1920,
        height: 1080,
        owner: {
          id: faker.string.uuid(),
          type: "User",
        },
        deletedAt: ""
      },
      members: [
        { id: '1', name: 'Nguyễn Văn A', avatar: metadataPhotoFaker() },
        { id: '2', name: 'Trần Thị B', avatar: metadataPhotoFaker() },
        { id: '3', name: 'Lê Văn C', avatar: metadataPhotoFaker() },
        { id: '4', name: 'Nguyễn Văn A', avatar: metadataPhotoFaker() },
        { id: '5', name: 'Trần Thị B', avatar: metadataPhotoFaker() },
        { id: '6', name: 'Lê Văn C', avatar: metadataPhotoFaker() },
      ],
    } satisfies GetGroupProfileResponseSchema);
  }

  if (groupId === "2") {
    return Response.json({
      id: "2",
      name: "Nhóm NextJs",
      membersCount: 8,
      createdDate: "2023-11-01",
      visibility: "Private",
      privacy: "Open",
      activityStatus: {
        newPostStatus: "Inactive",
        monthlyPostCount: 3,
      },
      coverImage: {
        id: faker.string.uuid(),
        type: "Photo",
        size: 1024,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        url: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
        width: 1280,
        height: 720,
        owner: {
          id: faker.string.uuid(),
          type: "Page",
        },
        deletedAt: ""
      },
      members: [
        { id: '1', name: 'Trần Văn X', avatar: metadataPhotoFaker() },
        { id: '2', name: 'Lê Thị Y', avatar: metadataPhotoFaker() },
      ],
    } satisfies GetGroupProfileResponseSchema);
  }

  return Response.json(
    { error: "Group not found" },
    { status: HttpStatusCode.NotFound }
  );
}

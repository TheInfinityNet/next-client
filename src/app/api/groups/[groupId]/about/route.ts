// src/app/api/groups/[groupId]/about/route.ts
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
        privacy: "Private",
        visibility: "Visible",
        createdDate: "January 18, 2021",
        totalMembers: 120,
        recentPosts: 5,
        recentMembers: 3,
        history: "3 years ago",
        description: "Nhóm dành cho các lập trình viên Frontend.",
        coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
      },
      { status: HttpStatusCode.Ok },
    );
  }

  if (params.groupId === "2") {
    return Response.json(
      {
        id: "2",
        name: "Nhóm NextJs",
        privacy: "Public",
        visibility: "Visible",
        createdDate: "March 10, 2022",
        totalMembers: 8,
        recentPosts: 12,
        recentMembers: 1,
        history: "2 years ago",
        description: "Nhóm thảo luận về Next.js và các công nghệ liên quan.",
        coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
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

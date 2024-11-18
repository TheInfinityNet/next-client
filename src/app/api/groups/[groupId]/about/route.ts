import { HttpStatusCode } from "axios";
import { GetGroupAboutResponse } from "@/lib/api/schemas/get-group-about.schema";

export async function GET(
  request: Request,
  { params }: { params: { groupId: string } },
) {
  if (params.groupId === "1") {
    return Response.json({
      id: "1",
      name: "Nhóm Dev Frontend",
      visibility: "Private",
      members: [
        {
          id: "member1",
          name: "Nguyễn Văn A",
          avatar: {
            id: "avatar1",
            type: "Photo",
            size: 1024,
            createdAt: "2021-01-18T12:00:00Z",
            updatedAt: "2023-02-01T14:00:00Z",
            url: "https://example.com/avatar1.jpg",
            width: 200,
            height: 200,
            owner: {
              id: "user1",
              type: "User",
            },
          },
        },
        {
          id: "member2",
          name: "Trần Thị B",
          avatar: {
            id: "avatar2",
            type: "Photo",
            size: 2048,
            createdAt: "2022-02-18T12:00:00Z",
            updatedAt: "2023-04-01T10:00:00Z",
            url: "https://example.com/avatar2.jpg",
            width: 200,
            height: 200,
            owner: {
              id: "page1",
              type: "Page",
            },
          },
        },
      ],
      activityStatus: {
        newPostStatus: "Active",
        monthlyPostCount: 10,
      },
      membersCount: 120,
      privacy: "Open",
      createdDate: "January 18, 2021",
      totalMembers: 120,
      recentPosts: 5,
      recentMembers: 3,
      history: "3 years ago",
      description: "Nhóm dành cho các lập trình viên Frontend.",
      coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
      updatedAt: "2023-02-01T14:00:00Z",
    } satisfies GetGroupAboutResponse);
  }

  if (params.groupId === "2") {
    const response: GetGroupAboutResponse = {
      id: "2",
      name: "Nhóm NextJs",
      visibility: "Public",
      members: [
        {
          id: "member1",
          name: "Nguyễn Văn C",
          avatar: {
            id: "avatar3",
            type: "Photo",
            size: 1024,
            createdAt: "2022-03-10T12:00:00Z",
            updatedAt: "2023-05-01T09:00:00Z",
            url: "https://example.com/avatar3.jpg",
            width: 200,
            height: 200,
            owner: {
              id: "user2",
              type: "User",
            },
          },
        },
      ],
      activityStatus: {
        newPostStatus: "Active",
        monthlyPostCount: 10,
      },
      membersCount: 8,
      privacy: "Open",
      createdDate: "March 10, 2022",
      totalMembers: 8,
      recentPosts: 12,
      recentMembers: 1,
      history: "2 years ago",
      description: "Nhóm thảo luận về Next.js và các công nghệ liên quan.",
      coverImage: "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png",
      updatedAt: "2023-05-01T09:00:00Z",
    };

    return Response.json(response, { status: HttpStatusCode.Ok });
  }

  return Response.json(
    {
      message: "Group not found",
      type: "NotFound",
    },
    { status: HttpStatusCode.NotFound },
  );
}

import { NextRequest } from "next/server";
import type { GetFriendRequestsResponseSchema } from "@/lib/api/schemas/get-friend-requests.schema";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import {
  addFriendBodySchema,
  AddFriendResponseSchema,
} from "@/lib/api/apis/add-friend.api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const limit = Number(searchParams.get("limit")) || 10;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({
    items: [
      {
        id: cursor
          ? faker.string.uuid()
          : "00000000-0000-0000-0000-000000000001",
        name: faker.person.fullName(),
        avatar: metadataPhotoFaker(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 150 }),
        status: "RequestReceived",
      },
      ...Array.from({ length: limit }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: metadataPhotoFaker(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 150 }),
        status: "RequestReceived" as const,
      })),
    ],
    nextCursor: faker.string.uuid(),
  } satisfies GetFriendRequestsResponseSchema);
}

export async function POST(request: NextRequest) {
  const { userId } = addFriendBodySchema.parse(await request.json());

  return Response.json({
    status: "RequestSent",
    message: "Friend request sent",
    userId,
  } satisfies AddFriendResponseSchema);
}

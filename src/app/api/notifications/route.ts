import { GetNotificationsResponseSchema } from "./../../../lib/api/schemas/get-notifications.schema";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";

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
        type: faker.helpers.arrayElement([
          "TaggedInPost",
          "FriendInvitation",
          "NewFollowerPost",
          "NewGroupPost",
          "PostReaction",
          "ReplyToComment",
          "TaggedInComment",
          "Miscellaneous",
        ] as const),
        thumbnail: metadataPhotoFaker(),
        title: faker.lorem.words(5),
        content: faker.lorem.sentence(),
        isRead: faker.datatype.boolean(),
        permalink: faker.internet.url(),
        userId: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      },
      ...Array.from({ length: limit }, () => ({
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement([
          "TaggedInPost",
          "FriendInvitation",
          "NewFollowerPost",
          "NewGroupPost",
          "PostReaction",
          "ReplyToComment",
          "TaggedInComment",
          "Miscellaneous",
        ] as const),
        thumbnail: metadataPhotoFaker(),
        title: faker.lorem.words(5),
        content: faker.lorem.sentence(),
        isRead: faker.datatype.boolean(),
        permalink: faker.internet.url(),
        userId: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      })),
    ],
    nextCursor: faker.string.uuid(),
  } satisfies GetNotificationsResponseSchema);
}

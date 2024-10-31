import type { GetFriendsSuggestionResponseSchema } from "@/lib/api/schemas/get-friends-suggestion.schema";
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
        name: faker.person.fullName(),
        avatar: metadataPhotoFaker(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 150 }),
        status: "NotConnected",
      },
      ...Array.from({ length: limit }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: metadataPhotoFaker(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 150 }),
        status: "NotConnected" as const,
      })),
    ],
    nextCursor: faker.string.uuid(),
  } satisfies GetFriendsSuggestionResponseSchema);
}

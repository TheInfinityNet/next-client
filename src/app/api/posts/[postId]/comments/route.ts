import { GetCommentsResponseSchema } from "@/lib/api/apis/get-comments.api";
import { commentReactionTypeSchema } from "@/lib/api/schemas/comment-reaction.schema";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({
    items: [
      {
        id: "00000000-0000-0000-0000-000000000001",
        postId: "00000000-0000-0000-0000-000000000001",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
          type: "User",
        },
        content: {
          text: "Hello, world!",
          facets: [],
        },
        replyCount: 1,
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
        reaction: faker.helpers.arrayElement(
          Object.values(commentReactionTypeSchema.enum),
        ),
        reactionCounts: {
          All: 100,
          Like: 50,
          Love: 25,
          Haha: 10,
          Wow: 5,
          Sad: 5,
        },
      },
      {
        id: "00000000-0000-0000-0000-000000000001",
        postId: "00000000-0000-0000-0000-000000000001",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
          type: "User",
        },
        content: {
          text: "Hello, world!",
          facets: [],
        },
        replyCount: 0,
        createdAt: "2021-08-01T00:00:00Z",
        updatedAt: "2021-08-01T00:00:00Z",
      },
    ],
    nextCursor: "",
  } satisfies GetCommentsResponseSchema);
}

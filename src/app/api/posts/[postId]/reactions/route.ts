import {
  createPostReactionBodySchema,
  createPostReactionResponseSchema,
  CreatePostReactionResponseSchema,
} from "@/lib/api/apis/create-post-reaction.api";
import { DeletePostReactionResponseSchema } from "@/lib/api/apis/delete-post-reaction";
import { GetPostReactionsResponse } from "@/lib/api/apis/get-post-reactions.api";
import { postReactionTypeSchema } from "@/lib/api/schemas/post-reaction.schema";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";

const postReactionFaker = () => ({
  id: faker.string.uuid(),
  reaction: faker.helpers.arrayElement(
    Object.values(postReactionTypeSchema.enum),
  ),
  postId: faker.string.uuid(),
  createdAt: faker.date.recent().toISOString(),
  profile: {
    id: faker.string.uuid(),
    name: faker.name.fullName(),
    avatar: metadataPhotoFaker(),
    type: faker.helpers.arrayElement(["User", "Page"]),
  },
});

export async function GET(request: NextRequest) {
  return Response.json({
    items: Array.from({ length: 10 }, postReactionFaker),
    nextCursor: faker.string.uuid(),
  } satisfies GetPostReactionsResponse);
}
export async function POST(request: NextRequest) {
  const { reaction } = createPostReactionBodySchema.parse(await request.json());

  return Response.json({
    reaction: reaction,
    reactionCounts: {
      Like: 10,
      Sad: 5,
      Angry: 3,
    },
  } satisfies CreatePostReactionResponseSchema);
}

export async function DELETE(request: NextRequest) {
  return Response.json({
    reactionCounts: {
      Like: 10,
      Sad: 5,
      Angry: 3,
    },
  } satisfies DeletePostReactionResponseSchema);
}

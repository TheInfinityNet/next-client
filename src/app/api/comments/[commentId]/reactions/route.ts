import {
  createCommentReactionBodySchema,
  CreateCommentReactionResponseSchema,
} from "@/lib/api/apis/create-comment-reaction.api";
import { DeleteCommentReactionResponseSchema } from "@/lib/api/apis/delete-comment-reaction.api";
import { GetCommentReactionsResponse } from "@/lib/api/apis/get-comment-reaction.api";
import { commentReactionTypeSchema } from "@/lib/api/schemas/comment-reaction.schema";
import { metadataPhotoFaker } from "@/lib/faker";
import { faker } from "@faker-js/faker";
import { NextRequest } from "next/server";

const commentReactionFaker = () => ({
  id: faker.string.uuid(),
  reaction: faker.helpers.arrayElement(
    Object.values(commentReactionTypeSchema.enum),
  ),
  commentId: faker.string.uuid(),
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
    items: Array.from({ length: 10 }, commentReactionFaker),
    nextCursor: faker.string.uuid(),
  } satisfies GetCommentReactionsResponse);
}

export async function POST(request: NextRequest) {
  const { reaction } = createCommentReactionBodySchema.parse(
    await request.json(),
  );
  return Response.json({
    reaction: reaction,
    reactionCounts: {
      Like: 10,
      Sad: 5,
      Angry: 3,
    },
  } satisfies CreateCommentReactionResponseSchema);
}

export async function DELETE() {
  return Response.json({
    reactionCounts: {
      Like: 10,
      Sad: 5,
      Angry: 3,
    },
  } satisfies DeleteCommentReactionResponseSchema);
}

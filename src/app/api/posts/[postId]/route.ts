import {
  PostRequestSchema, PostResponseSchema
} from "@/lib/api/schemas/post.schema";
import { HttpStatusCode } from "axios";

export async function GET(
  request: Request,
  { params }: { params: PostRequestSchema },
) {
  if (params. === "00000000-0000-0000-0000-000000000001") {
    return Response.json(
      {
        message: "Forbidden",
        type: "Forbidden",
      } satisfies GetPostErrorResponseSchema,
      { status: HttpStatusCode.Forbidden },
    );
  } else if (params.postId === "00000000-0000-0000-0000-000000000002") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000002",
        title: "Sample Post",
        content: "This is a sample post content.",
        author: {
          id: "00000000-0000-0000-0000-000000000003",
          name: "Author Name",
          avatar: "https://example.com/avatar.jpg",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } satisfies GetPostResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  }
  return Response.json(
    {
      message: "Post not found",
      type: "ResourceNotFound",
    } satisfies GetPostErrorResponseSchema,
    { status: HttpStatusCode.NotFound },
  );
}
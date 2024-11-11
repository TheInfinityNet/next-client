import {
  PostRequestSchema, PostResponseSchema, PostResponseErrorSchema,
} from "@/lib/api/schemas/post.schema";
import { HttpStatusCode } from "axios";

export async function GET(
  request: Request,
  { params }: { params: PostRequestSchema },
) {
  if (params.id === "00000000-0000-0000-0000-000000000001") {
    return Response.json(
      {
        message: "Forbidden",
        type: "Forbidden",
      } satisfies PostResponseErrorSchema,
      { status: HttpStatusCode.Forbidden },
    );
  } else if (params.id === "00000000-0000-0000-0000-000000000002") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000002",
        type: "Text",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          avatar: "https://example.com/avatar.png",
          name: "John Doe",
        },
        content: {
          text: "Hello World",
        },
      } satisfies PostResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  }
  return Response.json(
    {
      message: "Post not found",
      type: "ResourceNotFound",
    } satisfies PostResponseErrorSchema,
    { status: HttpStatusCode.NotFound },
  );
}
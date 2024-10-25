import { SignInRequestSchema } from "@/lib/api/schemas/sign-in.schema";
import { HttpStatusCode } from "axios";

export async function POST(request: Request) {
  const body: SignInRequestSchema = await request.json();

  if (body.email === "notfound@infinity.net") {
    return new Response(
      JSON.stringify({
        type: "ValidationError",
        message: "User not found",
        errors: {
          email: ["User not found"],
        },
      }),
      {
        status: HttpStatusCode.Unauthorized,
      },
    );
  }

  return Response.json({
    tokens: {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    },
    user: {
      id: 1,
    },
  });
}

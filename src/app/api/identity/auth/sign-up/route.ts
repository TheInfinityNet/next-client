import { SignUpRequestSchema } from "@/lib/api/schemas/sign-up.schema";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body: SignUpRequestSchema = await request.json();

  if (body.email === "conflict@infinity.net") {
    return new Response(
      JSON.stringify({
        type: "ValidationError",
        message: "User already exists",
        errors: {
          email: ["User already exists"],
        },
      }),
      {
        status: HttpStatusCode.UnprocessableEntity,
      },
    );
  }

  return Response.json({
    message: "Sign up successful",
  });
}

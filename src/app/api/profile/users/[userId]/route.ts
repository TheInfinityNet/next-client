import {
  GetUserProfileErrorResponseSchema,
  GetUserProfileParamsSchema,
  GetUserProfileResponseSchema,
} from "@/lib/api/schemas/get-user-profile.schema";
import { MetadataPhotoResponseSchema } from "@/lib/api/schemas/metadata.schema";
import { HttpStatusCode } from "axios";
import { faker } from "@faker-js/faker";

function metadataPhotoFaker(): MetadataPhotoResponseSchema {
  return {
    id: faker.string.uuid(),
    type: "Photo",
    url: faker.image.url(),
    size: faker.number.int(),
    width: faker.number.int(),
    height: faker.number.int(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
}

export async function GET(
  request: Request,
  { params }: { params: GetUserProfileParamsSchema },
) {
  // if (request.headers.get("Authorization") !== "Bearer accessToken") {
  //   return Response.json(
  //     {
  //       message: "Unauthorized",
  //       type: "Unauthorized",
  //     } satisfies GetUserProfileErrorResponseSchema,
  //     { status: HttpStatusCode.Unauthorized },
  //   );
  // }

  if (params.userId === "00000000-0000-0000-0000-000000000001") {
    return Response.json(
      {
        message: "Forbidden",
        type: "Forbidden",
      } satisfies GetUserProfileErrorResponseSchema,
      { status: HttpStatusCode.Forbidden },
    );
  } else if (params.userId === "00000000-0000-0000-0000-000000000002") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000002",
        name: "The Infinity Net",
        username: "infinity",
        cover: metadataPhotoFaker(),
        avatar: metadataPhotoFaker(),
        status: "Active",
      } satisfies GetUserProfileResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  } else if (params.userId === "00000000-0000-0000-0000-000000000003") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000003",
        name: "The Infinity Net",
        username: "infinity",
        cover: metadataPhotoFaker(),
        avatar: metadataPhotoFaker(),
        status: "Inactive",
      } satisfies GetUserProfileResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  } else if (params.userId === "00000000-0000-0000-0000-000000000004") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000004",
        name: "The Infinity Net",
        username: "infinity",
        cover: metadataPhotoFaker(),
        avatar: metadataPhotoFaker(),
        status: "Locked",
      } satisfies GetUserProfileResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  } else if (params.userId === "00000000-0000-0000-0000-000000000005") {
    return Response.json(
      {
        id: "00000000-0000-0000-0000-000000000005",
        name: "The Infinity Net",
        username: "infinity",
        cover: metadataPhotoFaker(),
        avatar: metadataPhotoFaker(),
        status: "Deleted",
      } satisfies GetUserProfileResponseSchema,
      { status: HttpStatusCode.Ok },
    );
  }

  return Response.json(
    {
      message: "User not found",
      type: "ResourceNotFound",
    } satisfies GetUserProfileErrorResponseSchema,
    { status: HttpStatusCode.NotFound },
  );
}

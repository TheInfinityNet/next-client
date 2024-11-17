import { GetTimelinePostsResponseSchema } from "@/lib/api/apis/get-timeline-posts.api";
import {
  metadataAudioFaker,
  metadataFileFaker,
  metadataPhotoFaker,
  metadataVideoFaker,
} from "@/lib/faker";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return Response.json({
    items: [
      {
        id: "00000000-0000-0000-0000-000000000001",
        type: "Text",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        type: "Photo",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        photo: metadataPhotoFaker(),
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000003",
        type: "Video",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        video: metadataVideoFaker(),
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000004",
        type: "File",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        file: metadataFileFaker(),
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000005",
        type: "Audio",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        audio: metadataAudioFaker(),
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000005",
        type: "MultiMedia",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        aggregates: [
          {
            id: "00000000-0000-0000-0000-000000000002",
            type: "Photo",
            owner: {
              id: "00000000-0000-0000-0000-000000000001",
              type: "User",
              name: "John Doe",
              avatar: metadataPhotoFaker(),
            },
            content: {
              text: "Hello, World!",
              facets: [],
            },
            photo: metadataPhotoFaker(),
            audiance: {
              type: "Custom",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "00000000-0000-0000-0000-000000000003",
            type: "Video",
            owner: {
              id: "00000000-0000-0000-0000-000000000001",
              type: "User",
              name: "John Doe",
              avatar: metadataPhotoFaker(),
            },
            content: {
              text: "Hello, World!",
              facets: [],
            },
            video: metadataVideoFaker(),
            audiance: {
              type: "Custom",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        type: "Share",
        owner: {
          id: "00000000-0000-0000-0000-000000000001",
          type: "User",
          name: "John Doe",
          avatar: metadataPhotoFaker(),
        },
        content: {
          text: "Hello, World!",
          facets: [],
        },
        share: {
          id: "00000000-0000-0000-0000-000000000005",
          type: "MultiMedia",
          owner: {
            id: "00000000-0000-0000-0000-000000000001",
            type: "User",
            name: "John Doe",
            avatar: metadataPhotoFaker(),
          },
          content: {
            text: "Hello, World!",
            facets: [],
          },
          aggregates: [
            {
              id: "00000000-0000-0000-0000-000000000002",
              type: "Photo",
              owner: {
                id: "00000000-0000-0000-0000-000000000001",
                type: "User",
                name: "John Doe",
                avatar: metadataPhotoFaker(),
              },
              content: {
                text: "Hello, World!",
                facets: [],
              },
              photo: metadataPhotoFaker(),
              audiance: {
                type: "Custom",
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: "00000000-0000-0000-0000-000000000003",
              type: "Video",
              owner: {
                id: "00000000-0000-0000-0000-000000000001",
                type: "User",
                name: "John Doe",
                avatar: metadataPhotoFaker(),
              },
              content: {
                text: "Hello, World!",
                facets: [],
              },
              video: metadataVideoFaker(),
              audiance: {
                type: "Custom",
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          audiance: {
            type: "Custom",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        audiance: {
          type: "Custom",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    nextCursor: "",
  } satisfies GetTimelinePostsResponseSchema);
}

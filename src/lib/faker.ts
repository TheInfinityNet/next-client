import { faker } from "@faker-js/faker";
import {
  MetadataAudioResponseSchema,
  MetadataFileResponseSchema,
  MetadataPhotoResponseSchema,
  MetadataVideoResponseSchema,
} from "./api/schemas/metadata.schema";

export function metadataPhotoFaker(): MetadataPhotoResponseSchema {
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

export function metadataVideoFaker(): MetadataVideoResponseSchema {
  return {
    id: faker.string.uuid(),
    type: "Video",
    thumbnail: metadataPhotoFaker(),
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    size: faker.number.int(),
    width: faker.number.int(),
    height: faker.number.int(),
    duration: faker.number.int(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
}

export function metadataFileFaker(): MetadataFileResponseSchema {
  return {
    id: faker.string.uuid(),
    type: "File",
    filename: faker.system.fileName(),
    mimeType: faker.system.mimeType(),
    url: faker.image.url(),
    size: faker.number.int(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
}

export function metadataAudioFaker(): MetadataAudioResponseSchema {
  return {
    id: faker.string.uuid(),
    type: "Audio",
    url: faker.image.url(),
    size: faker.number.int(),
    duration: faker.number.int(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
}

import { faker } from "@faker-js/faker";
import { MetadataPhotoResponseSchema } from "./api/schemas/metadata.schema";

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

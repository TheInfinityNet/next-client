import axios from "axios";
import { EditUserProfileSchema, EditUserProfileResponseSchema } from "@/lib/api/schemas/edit-user-profile.schema";

export const editProfileApi = async (data: EditUserProfileSchema): Promise<EditUserProfileResponseSchema> => {
  const response = await axios.put("/api/profile", data);
  return response.data;
};
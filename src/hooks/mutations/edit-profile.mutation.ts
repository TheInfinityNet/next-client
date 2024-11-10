import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  EditUserProfileSchema,
  EditUserProfileResponseSchema,
} from "@/lib/api/schemas/edit-user-profile.schema";
import { editProfileApi } from "@/lib/api/apis/edit-profile.api";

export function useEditProfileMutation() {
  const client = useQueryClient();

  return useMutation<
    EditUserProfileResponseSchema,
    Error,
    EditUserProfileSchema
  >({
    mutationKey: ["editProfile"],
    mutationFn: (data) => editProfileApi(data),
    onSuccess(data) {
      client.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        // Handle Axios error
        console.error("Axios error:", error.response?.data);
      } else {
        // Handle other errors
        console.error("Error:", error);
      }
    },
  });
}
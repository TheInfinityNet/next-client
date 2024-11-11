import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  EditUserProfileSchema,
  EditUserProfileResponseSchema,
  EditUserProfileErrorResponse,
} from "@/lib/api/schemas/edit-user-profile.schema";
import { editProfileApi } from "@/lib/api/apis/edit-profile.api";
import { getQueryClient } from "@/lib/query-client";

export function useEditProfileMutation() {
  const client = getQueryClient();

  return useMutation<
    EditUserProfileResponseSchema,
    EditUserProfileErrorResponse,
    EditUserProfileSchema
  >({
    mutationKey: ["edit-profile"],
    mutationFn: (data) => editProfileApi(data),
    onSuccess(data) {
      client.invalidateQueries({
        queryKey: ["user-profile", { userId: data.user.id }],
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
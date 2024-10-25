import { UserProfileResponseSchema } from "@/lib/api/schemas/user-profile.schema";
import { create } from "zustand";

type CurrentUserProfileStore = {
  currentUserProfile: UserProfileResponseSchema | null;
  actions: {
    setCurrentUserProfile: (profile: UserProfileResponseSchema) => void;
  };
};

export const useCurrentUserProfileStore = create<CurrentUserProfileStore>(
  (set) => ({
    currentUserProfile: null,
    actions: {
      setCurrentUserProfile: (profile) => set({ currentUserProfile: profile }),
    },
  }),
);

export const useCurrentUserProfile = () =>
  useCurrentUserProfileStore((state) => state.currentUserProfile);
export const useCurrentUserProfileActions = () =>
  useCurrentUserProfileStore((state) => state.actions);

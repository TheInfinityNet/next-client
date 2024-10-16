import { UserProfileResponse } from "infinity-net-api";
import { create } from "zustand";

type CurrentUserProfileStore = {
  currentUserProfile: UserProfileResponse | null;
  actions: {
    setCurrentUserProfile: (profile: UserProfileResponse) => void;
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

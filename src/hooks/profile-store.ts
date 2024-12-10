import { create } from "zustand";
import Cookies from "js-cookie";
import {baseProfileSchema} from "@/lib/api/schemas/profile.schema";

type Profile = {
    id: string;
    accountId: string;
    avatarId: string;
    coverId: string;
    type: "User" | "Page";
    username: string;
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNumber: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    status: "Active" | "Inactive" | "Locked" | "Deleted";
};

type ProfileStore = {
  currentProfile: Profile | null;
  actions: {
    setCurrentProfile: (profile: Profile) => void;
    getCurrentProfile: () => Profile | undefined;
    updateCurrentProfile: (profile: Profile) => void;
    clearCurrentProfile: () => void;
  };
};

const CURRENT_PROFILE_KEY = "current_profile";

export const useProfileStore = create<ProfileStore>(
  (set, get): ProfileStore => ({
    currentProfile: null,
    actions: {
        // Lưu profile vào localStorage và cập nhật state
        setCurrentProfile: (profile) => {
            localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(profile));
            set({ currentProfile: profile });
        },

        // Lấy profile từ localStorage (nếu có) hoặc state
        getCurrentProfile: () => {
            const stateProfile = get().currentProfile;
            if (stateProfile) return stateProfile;

            const storedProfile = localStorage.getItem(CURRENT_PROFILE_KEY);
            if (storedProfile) {
                const parsedProfile = JSON.parse(storedProfile);
                set({ currentProfile: parsedProfile });
                return parsedProfile;
            }

            return undefined;
        },

        // Cập nhật profile trong localStorage và state
        updateCurrentProfile: (profile) => {
            const updatedProfile = {
                ...get().currentProfile,
                ...profile,
            };
            localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(updatedProfile));
            set({ currentProfile: updatedProfile });
        },

        // Xóa profile khỏi localStorage và state
        clearCurrentProfile: () => {
            localStorage.removeItem(CURRENT_PROFILE_KEY);
            set({ currentProfile: null });
        },
    },
  }),
);

export const useCurrentProfile = () =>
    useProfileStore((state) => state.currentProfile);
export const useProfileStoreActions = () =>
    useProfileStore((state) => state.actions);

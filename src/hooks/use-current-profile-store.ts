import { create } from "zustand";
import {baseProfileResponseSchema, BaseProfileResponseSchema} from "@/lib/api/schemas/profile.schema";
import Cookies from "js-cookie";

type CurrentProfileStore = {
    currentProfile: BaseProfileResponseSchema | null;
  actions: {
    setCurrentProfile: (profile: BaseProfileResponseSchema) => void;
    getCurrentProfile: () => BaseProfileResponseSchema | undefined;
    clearCurrentProfile: () => void;
  };
};

const CURRENT_PROFILE_KEY = "current_profile";

export const useCurrentProfileStore = create<CurrentProfileStore>(
  (set) => ({
    currentProfile: null,
    actions: {
      setCurrentProfile: (profile) =>
          Cookies.set(CURRENT_PROFILE_KEY, JSON.stringify(profile), {
              path: "/",
              secure: true,
              sameSite: "Strict",
          }),
        getCurrentProfile: () => {
            const storedProfile = Cookies.get(CURRENT_PROFILE_KEY);

            if (storedProfile) {
                try {
                    // Parse JSON và xác thực với zod schema
                    const parsedProfile = JSON.parse(storedProfile);
                    const validatedProfile = baseProfileResponseSchema.parse(parsedProfile);

                    // Lưu profile hợp lệ vào state
                    set({ currentProfile: validatedProfile });
                    return validatedProfile;
                } catch (error) {
                    console.error("Failed to validate profile:", error);
                    localStorage.removeItem(CURRENT_PROFILE_KEY); // Xóa dữ liệu không hợp lệ
                }
            }

            return undefined; // Không có dữ liệu hoặc dữ liệu không hợp lệ
        },

        clearCurrentProfile: () => {
            Cookies.remove(CURRENT_PROFILE_KEY, { path: "/" });
            set({ currentProfile: null });
        },
    },
  }),
);

export const useCurrentProfile = () =>
  useCurrentProfileStore((state) => state.currentProfile);
export const useCurrentProfileActions = () =>
  useCurrentProfileStore((state) => state.actions);

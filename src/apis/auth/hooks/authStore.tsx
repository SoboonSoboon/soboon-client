import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Location = {
  province: string | null;
  city: string | null;
  district: string | null;
  detail?: string | null;
};

type AuthStoreProps = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  userId: number | null;
  setUserId: (userId: number) => void;
  userName: string | null;
  setUserName: (userName: string) => void;
  userNickname: string | null;
  setUserNickname: (userNickname: string) => void;
  userImage: string | null;
  setUserImage: (userImage: string) => void;
  userToken: string | null;
  setUserToken: (userToken: string) => void;
  userLocation: Location;
  setUserLocation: (userLocation: Location) => void;
};

export const useAuthStore = create(
  persist<AuthStoreProps>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          userName: null,
          userNickname: null,
          userImage: null,
          userToken: null,
          userLocation: {
            province: null,
            city: null,
            district: null,
            detail: null,
          },
        }),
      userId: null,
      setUserId: (userId: number) => set({ userId: userId }),

      userName: null,
      setUserName: (userName: string) => set({ userName: userName }),

      userNickname: null,
      setUserNickname: (userNickname: string) =>
        set({ userNickname: userNickname }),

      userImage: null,
      setUserImage: (userImage: string) => set({ userImage: userImage }),

      userToken: null,
      setUserToken: (userToken: string) => set({ userToken: userToken }),

      userLocation: {
        province: null,
        city: null,
        district: null,
        detail: null,
      },
      setUserLocation: (userLocation: Location) =>
        set({ userLocation: userLocation }),
    }),
    {
      name: 'userInfoStorage',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    },
  ),
);

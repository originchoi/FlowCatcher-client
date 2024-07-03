import { create } from "zustand";
import { UserStore, HeaderStateStore } from "src/types/auth";

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
}));

const useHeaderStateStore = create<HeaderStateStore>((set) => ({
  headerState: "MainPage",
  setHeaderState: (headerState) => set({ headerState }),
}));

export { useUserStore, useHeaderStateStore };

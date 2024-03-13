import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  user: {},
  setIsLoggedIn: (isLoggedIn) =>
    set({
      isLoggedIn,
    }),
  setUser: (user) => set({ user }),
}));

const useHeaderStateStore = create((set) => ({
  headerState: "MainPage",
  setHeaderState: (headerState) => set({ headerState }),
}));

export { useUserStore, useHeaderStateStore };

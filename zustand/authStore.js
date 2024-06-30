import { create } from "zustand";

export const useAuthStore = create((set) => ({
  email: "",
  role: "",
  name: "",
  picture: "",
  isNewUser: false,

  // Define actions to update state
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
  setName: (name) => set({ name }),
  setPicture: (picture) => set({ picture }),
  setIsNewUser: (isNewUser) => set({ isNewUser }),
}));

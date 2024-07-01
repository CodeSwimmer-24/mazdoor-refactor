import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import path
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
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
      }),
      {
        name: "auth-storage", // unique name
        getStorage: () => AsyncStorage, // specify which storage to use
      }
    )
  )
);

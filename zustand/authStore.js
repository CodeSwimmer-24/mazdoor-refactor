import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import path
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useAuthStore = create(
  persist(
    (set) => ({
      email: "",
      role: "",
      name: "",
      contact: "",
      picture: "",
      buildingAddress: "",
      locality: "",
      isNewUser: false,

      // Define actions to update state
      setEmail: (email) => set((state) => ({ ...state, email })),
      setRole: (role) => set((state) => ({ ...state, role })),
      setName: (name) => set((state) => ({ ...state, name })),
      setContact: (contact) => set((state) => ({ ...state, contact })),
      setPicture: (picture) => set((state) => ({ ...state, picture })),
      setBuildingAddress: (buildingAddress) =>
        set((state) => ({ ...state, buildingAddress })),
      setLocality: (locality) => set((state) => ({ ...state, locality })),
      setIsNewUser: (isNewUser) => set((state) => ({ ...state, isNewUser })),
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => AsyncStorage,
    }
  )
);

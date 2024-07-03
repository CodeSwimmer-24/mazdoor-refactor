import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import path
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export const useAuthStore = create(
  // devtools(
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
      setEmail: (email) => set({ email }),
      setRole: (role) => set({ role }),
      setName: (name) => set({ name }),
      setContact: (contact) => set({ contact }),
      setPicture: (picture) => set({ picture }),
      setBuildingAddress: (buildingAddress) => set({ buildingAddress }),
      setLocality: (locality) => set({ locality }),
      setIsNewUser: (isNewUser) => set({ isNewUser }),

      // Define action to reset state
      reset: () => set({
        email: "",
        role: "",
        name: "",
        contact: "",
        picture: "",
        buildingAddress: "",
        locality: "",
        isNewUser: false,
      })
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => AsyncStorage,
      // storage: {
      //   getItem: (key) => JSON.parse(AsyncStorage.getItem(key)),
      //   setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
      //   removeItem: (key) => AsyncStorage.removeItem(key)
      // }
    }
  )
  // )
);

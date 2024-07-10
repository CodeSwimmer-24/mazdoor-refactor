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
      exactLocation: "",
      isNewUser: false,
      // state to know that whether the apis at login time were called or not
      startupApisCalled: false,

      // Define actions to update state
      setEmail: (email) => set((state) => ({ ...state, email })),
      setRole: (role) => set((state) => ({ ...state, role })),
      setName: (name) => set((state) => ({ ...state, name })),
      setContact: (contact) => set((state) => ({ ...state, contact })),
      setPicture: (picture) => set((state) => ({ ...state, picture })),
      setBuildingAddress: (buildingAddress) =>
        set((state) => ({ ...state, buildingAddress })),
      setLocality: (locality) => set((state) => ({ ...state, locality })),
      setExactLocation: (exactLocation) => set((state) => ({ ...state, exactLocation })),
      setIsNewUser: (isNewUser) => set((state) => ({ ...state, isNewUser })),
      setStartupApisCalled: (called) => set((state) => ({ ...state, startupApisCalled: called })),

      reset: () => set({
        email: "",
        role: "",
        name: "",
        contact: "",
        picture: "",
        buildingAddress: "",
        locality: "",
        exactLocation: "",
        isNewUser: false,
        startupApisCalled: false 
      })
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => AsyncStorage,
    }
  )
);

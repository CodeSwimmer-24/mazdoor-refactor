import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import path
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useSystemStore = create(
  persist(
    (set) => ({
      locations: [],
      setLocations: (locationsData) => set((state) => {
        return { ...state, locations: locationsData }
      }),

    }),
    {
      name: "system-storage", // unique name
      getStorage: () => AsyncStorage,
    }
  )
);

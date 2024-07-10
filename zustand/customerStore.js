import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useCustomerStore = create(
  persist(
    (set) => ({
      favoriteSps: [],

      // Define actions to update state
      setFavoriteSps: (favoriteSps) => set((state) => ({ ...state, favoriteSps })),

      reset: () => set({
        favoriteSps: []
      })
    }),
    {
      name: "customer-storage",
      getStorage: () => AsyncStorage
    }
  )
);

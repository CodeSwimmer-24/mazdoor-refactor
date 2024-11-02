import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useServiceProviderStore = create(
  persist(
    (set) => ({
      serviceProvider: null,
      setServiceProvider: (data) => set({ serviceProvider: data }),
    }),
    {
      name: "serviceProvider-storage", // unique name for this storage
      getStorage: () => AsyncStorage,
    }
  )
);

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const useStatusStore = create(
  persist(
    (set) => ({
      status: null,

      // Action to update status
      setStatus: (newStatus) => set(() => ({ status: newStatus })),
    }),
    {
      name: "status-storage", // unique name for AsyncStorage
      getStorage: () => AsyncStorage, // specify AsyncStorage as the storage provider
    }
  )
);

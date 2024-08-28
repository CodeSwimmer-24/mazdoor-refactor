// src/zustand/modalStore.js
import create from "zustand";

export const useModalStore = create((set) => ({
  isVisible: false,
  setIsVisible: (visible) => set({ isVisible: visible }),
}));

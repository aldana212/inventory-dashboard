// src/store/themeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: true,

      setTheme: (value) => {
        set({ darkMode: value });
        document.documentElement.classList.toggle("dark", value);
      },

      toggleTheme: () => {
        const newTheme = !get().darkMode;
        set({ darkMode: newTheme });
        document.documentElement.classList.toggle("dark", newTheme);
      },
    }),
    {
      name: "theme-storage",

      // 🔥 sincroniza DOM cuando Zustand se carga
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle("dark", state.darkMode);
        }
      },
    },
  ),
);

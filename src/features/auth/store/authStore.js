import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Variales Goblales
  token: localStorage.getItem("token"),
  user: null,

  // funciones que modifican el estado
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { Roles } from "../constants/roles";

type RoleType = typeof Roles[keyof typeof Roles];

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  role: RoleType[] | null;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setRole: (role: RoleType[] | null) => void;
  setEmail: (email: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      role: null,
      email: "Unknown",
      setToken: (token) => {
          set({ token });
          token && Cookies.set("token", token, { sameSite: "strict" });
      },
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setRole: (role) => set({ role }),
      setEmail: (email) => set({ email }),
      logout: () => {
          set({ token: null, refreshToken: null, role: null, email: null })
          Cookies.remove("token");
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);
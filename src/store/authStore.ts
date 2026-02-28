import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ADMIN" | "MODEL" | "VISITOR";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  image: string | null;
}

export interface Profile {
  id: string;
  artisticName: string | null;
  bio: string | null;
  height: number | null;
  eyeColor: string | null;
  hairColor: string | null;
  measurements: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  featured: boolean;
  views?: number;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),

      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }),

      logout: () => set({
        user: null,
        profile: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }),
    }),
    {
      name: "bellas-glamour-auth",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        token: state.token,
      }),
    }
  )
);

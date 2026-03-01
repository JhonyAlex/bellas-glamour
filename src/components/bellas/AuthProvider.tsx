"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { login, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          login(data.user, "");
          if (data.profile) {
            setProfile(data.profile);
          }
        }
      } catch {
        // No autenticado
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [login, setProfile, setLoading]);

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/components/store/cat-store";
import api from "@/lib/api";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const { setSession, clearSession, token } = useAuthStore();

  useEffect(() => {
    // 1. Check if we have a token in LocalStorage
    const savedToken = localStorage.getItem('access_token');
    
    if (savedToken) {
      // 2. Automatically verify the token with your Spring Boot backend
      api.post("/auth/validate-token")
        .then((res) => {
          // 3. Set the global session
          setSession(res.data.userId, savedToken);
        })
        .catch(() => {
          // 4. If token is expired, clear the session
          clearSession();
        });
    }
  }, []);

  return <>{children}</>;
}
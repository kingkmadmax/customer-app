"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "@/lib/auth"; // Adjust this path to your auth.ts file

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Helper function to check/refresh token
    const checkAndRefreshToken = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) return;

      try {
        // Decode the JWT to see when it expires
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const expiresAt = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();

        // 2. If the token expires in less than 1 minute, refresh it!
        if (expiresAt - now < 60000) {
          console.log("Token expiring soon. Initiating refresh...");
          
          const result = await refreshAccessToken(refreshToken);

          if (result.success && result.access_token) {
            // 3. Send new token to Spring Boot backend to keep it synced
            const backendRes = await fetch('http://localhost:9090/api/auth/validate-token', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${result.access_token}`,
                'Content-Type': 'application/json'
              }
            });

            if (backendRes.ok) {
              localStorage.setItem("access_token", result.access_token);
              if (result.refresh_token) {
                localStorage.setItem("refresh_token", result.refresh_token);
              }
              console.log("✅ Session extended successfully!");
            }
          } else {
            // If refresh token itself expired, clear storage (User must re-login)
            console.warn("Refresh token expired. Logging out.");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/Pages/auth/LogIn";
          }
        }
      } catch (err) {
        console.error("Error running background session sync:", err);
      }
    };

    // Run check immediately on load
    checkAndRefreshToken();

    // Check every 30 seconds in the background
    const interval = setInterval(checkAndRefreshToken, 30000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
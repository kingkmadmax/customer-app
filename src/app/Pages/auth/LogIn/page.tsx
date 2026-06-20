"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Client-side validation
    const validation = loginSchema.safeParse({ username, password });
    if (!validation.success) {
      setMessage({ type: "error", text: validation.error.issues[0]?.message || "Invalid input" });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      // 1. Login with Keycloak via Server Action
      const result = await loginUser(formData);

      if (!result.success || !result.access_token) {
        setMessage({ type: "error", text: result.error || "Login failed" });
        return;
      }

   
      const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090"}/api/auth/validate-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${result.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (backendRes.ok) {
        // Success
        localStorage.setItem("access_token", result.access_token);
        if (result.refresh_token) {
          localStorage.setItem("refresh_token", result.refresh_token);
        }

        setMessage({ type: "success", text: "✅ Login successful!" });
        
        // Better than window.location.href
        setTimeout(() => {
          router.push("/");
          router.refresh(); // Refresh server data if needed
        }, 800);
      } else {
        const errorData = await backendRes.json().catch(() => ({}));
        setMessage({
          type: "error",
          text: `❌ Backend validation failed: ${errorData.message || "Unauthorized"}`,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage({ type: "error", text: "❌ Network error. Please check if the backend is running." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-12 px-8 bg-white gap-10">
        {/* Login Form */}
        <div className="border-2 border-gray-300 shadow-lg p-8 rounded-xl flex-1 flex flex-col justify-center max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center mb-10 text-black">
            Login to Exclusive
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Email
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white h-12 w-full rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
              <p>
                Don’t have an account?{" "}
                <a href="/Pages/auth/SignUp" className="text-blue-600 hover:underline font-medium">
                  Sign Up
                </a>
              </p>
            </div>
          </form>

          {message && (
            <p
              className={`mt-6 text-center p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex flex-1 bg-[#D0E6EB] rounded-2xl items-center justify-center relative overflow-hidden">
          <Image
            className="object-contain scale-90"
            src="/PhoneImage.png"
            alt="Login illustration"
            fill
            priority
          />
        </div>
      </main>
    </div>
  );
}
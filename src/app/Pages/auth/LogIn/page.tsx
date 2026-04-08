"use client"; // Must be at the top for client-side navigation

import Image from "next/image";
import { FaGoogle } from "react-icons/fa";  
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter(); // I
  const handleLogin = () => {
    // Navigate to another page
    router.push("/"); // Replace with your target route
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white dark:bg-black gap-10">

        {/* Text/Form */}
        <div className="border-2 border-gray-300 shadow-lg p-4 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-20">
          <h1 className="text-3xl font-semibold text-center text-black dark:text-zinc-50">
            Login into Exclusive
          </h1>

          {/* Form Inputs */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Email"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />
            <input
              type="Password"
              placeholder="Enter your password"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-4 items-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white h-10 w-32 rounded-md"
            >
              Login
            </button>
            <a href="/forgot-password" className="text-blue-500 flex items-center h-10">
              Forget Password?
            </a>
          </div>

          <p className="text-center">
            Don’t have an account?{" "}
            <a href="/Pages/auth/SignUp" className="text-blue-500">Sign Up</a>
          </p>
        </div>

        {/* Image */}
        <div className="bg-[#D0E6EB] rounded flex-1 flex items-center justify-center relative">
          <Image
            className="dark:invert object-contain"
            src="/PhoneImage.png"
            alt="PhoneImage.png"
            fill
            priority
          />
        </div>

      </main>
    </div>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUP() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Pages/auth/LogIn"); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      
      {/* Smaller container */}
      <main className="relative w-full max-w-4xl py-16 px-8 bg-white dark:bg-black rounded-lg shadow-md">
        
        {/* Smaller background */}
        <div className="absolute inset-0 h-[550px] bg-[#D0E6EB] rounded-lg overflow-hidden">
          <Image
            className="object-contain w-full h-full"
            src="/PhoneImage.png"
            alt="PhoneImage"
            width={400}
            height={500}
          />
        </div>

        {/* Centered Form */}
        <div className="relative   max-h-xl z-10 flex items-center justify-center min-h-[400px]">
          
          <div className="border border-black p-5 rounded bg-white/90 backdrop-blur max-w-sm w-full space-y-5">
            
            <h1 className="text-2xl font-semibold text-center text-black">
              Change The Password
            </h1>

            <input
              type="text"
              placeholder="Password"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white h-9 w-full rounded-md"
            >
              Change Password
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUP() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Password: "",
    New_Password: "",
    Confirm_Password: "",
  });
  
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); 
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check if empty
    if (!formData.Password || !formData.New_Password || !formData.Confirm_Password) {
      setError("Please fill in all fields before continuing.");
      return;
    }

    // 2. FIXED LOGIC: Compare New_Password with Confirm_Password
    if (formData.New_Password !== formData.Confirm_Password) {
      setError("The new passwords do not match.");
      return;
    }

    // 3. Success
    router.push("/Pages/auth/LogIn");
  };

  const isFormInvalid = !formData.Password.trim() || 
                       !formData.New_Password.trim() || 
                       !formData.Confirm_Password.trim();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="relative w-full max-w-4xl py-16 px-8 bg-white rounded-lg shadow-md">
        
        {/* Background Image */}
        <div className="absolute inset-0 h-[550px] bg-[#D0E6EB] rounded-lg overflow-hidden">
          <Image
            className="object-contain w-full h-full"
            src="/PhoneImage.png"
            alt="PhoneImage"
            width={400}
            height={500}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="border border-gray-400 p-8 rounded bg-white/90 backdrop-blur max-w-sm w-full space-y-5 shadow-xl">
            
            <h1 className="text-2xl font-semibold text-center text-black">
              Change Password
            </h1>

            {/* ERROR DISPLAY */}
            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded border border-red-200">
                {error}
              </p>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange} 
                placeholder="Current Password"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <input
                type="password"
                name="New_Password"
                value={formData.New_Password}
                onChange={handleInputChange} 
                placeholder="New Password"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <input
                type="password"
                name="Confirm_Password"
                value={formData.Confirm_Password}
                onChange={handleInputChange} 
                placeholder="Confirm Password"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <button
                type="submit"
                disabled={isFormInvalid}
                className={`h-10 w-full rounded-md font-medium transition-all ${
                  isFormInvalid 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
                }`}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
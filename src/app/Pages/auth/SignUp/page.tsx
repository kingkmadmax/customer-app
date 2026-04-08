"use client";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";  
import { useRouter } from "next/navigation";
import { useState } from "react";
// 1. REMOVE THIS LINE: import { error } from "console";

export default function SignUP() {
   const router = useRouter();
   const [formDate, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: ""
   });
   const [error, setError] = useState("");

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // This requires the 'name' attribute below!
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); 
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate.firstName || !formDate.lastName || !formDate.emailOrPhone) {
      setError("Please fill in all fields.");
      return;
    }
    router.push("/Pages/auth/PaswordRest");
  };

  const isFormInvalid = !formDate.firstName.trim() || 
                       !formDate.lastName.trim() || 
                       !formDate.emailOrPhone.trim();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white dark:bg-black gap-10">

        <div className="bg-[#D0E6EB] rounded flex-1 flex items-center justify-center">
          <Image
            className="dark:invert object-contain h-full"
            src="/PhoneImage.png"
            alt="PhoneImage.png"
            width={750}
            height={701}
            priority
          />
        </div>

        <div className="border-2 border-gray-300 p-4 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-6 shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-black dark:text-zinc-50">
            Create an Account
          </h1>
          <p className="text-center">Enter your details below</p>

          <div className="space-y-6">
            {/* 2. ADDED 'name' ATTRIBUTES TO ALL INPUTS BELOW */}
            <input
              type="text"
              name="firstName" 
              placeholder="First Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
              value={formDate.firstName}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
              value={formDate.lastName}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone Number"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
              value={formDate.emailOrPhone}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-4">
            <button
              disabled={isFormInvalid}
              className={`h-10 w-full rounded-md font-medium transition-all ${
                isFormInvalid 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
              }`}
              onClick={handleSignUp}
            >
              Sign up
            </button>

            <div className="flex items-center justify-center gap-3 border rounded-md h-10 w-full cursor-pointer hover:bg-gray-50">
              <FaGoogle />
              <span>Sign up with Google</span>
            </div>
          </div>

          <p className="text-center">
            Already have an account? <a href="/Pages/auth/LogIn" className="text-blue-500">Login</a>
          </p>
        </div>
      </main>
    </div>
  );
}
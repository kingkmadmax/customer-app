"use client";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";  
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";



export default function SignUP() {
   const router = useRouter();

  const handlePasswordReset = () => {
    router.push("/Pages/auth/PaswordRest"); // Replace with your target route
   
  };
  return (
    
    <div className="  flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white dark:bg-black gap-10">

        {/* Image */}
        <div className=" bg-[#D0E6EB]  rounded flex-1 flex items-center justify-center">
          <Image
            className="dark:invert object-contain h-full"
            src="/PhoneImage.png"
            alt="PhoneImage.png"
            width={750}
            height={701}
            priority
          />
        </div>

        {/* Text/Form */}
        <div className="border-2 border-black p-4 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-6">
          <h1 className="text-3xl font-semibold text-center text-black dark:text-zinc-50">
            Create an Account
          </h1>

          <p className="text-center">Enter your details below</p>

          {/* Form Inputs */}
          <div className=" space-y-6">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <input
              type="text"
              placeholder="Email or Phone Number"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black"
            />

            <div className="flex flex-col items-center w-full max-w-3xl gap-2 border border-gray-400 rounded-md p-3 focus-within:border-blue-500 focus-within:bg-gray-100 transition-colors">
              <span className="text-center text-sm font-medium">Fida ID</span>
              <input
                type="text"
                className="w-full text-center outline-none"
              />
              <IdentificationIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col w-full gap-4">
            <button  onClick={handlePasswordReset} className="bg-blue-500 text-white h-10 w-full rounded-md">
              Sign in
            </button>

            <div className="flex items-center justify-center gap-3 border rounded-md h-10 w-full cursor-pointer">
              <FaGoogle />
              <span>Sign in with Google</span>
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
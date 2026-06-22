"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/lib/auth";
import { z } from "zod";


const loginSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [formData,setFormData]=  useState ({
    username:'',
    password:""
  })  
  const [message, setMessage] = useState ('');
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message) setMessage("");
  };
  const isFormInvalid =
    !formData.username.trim() ||
    !formData.password.trim();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (isFormInvalid) {
          setMessage("❌ Please fill in all fields.");
          
          return;
          
        }
    
        try {
          setLoading(true);
          setMessage("");
    
          const data = new FormData();
          data.append("username", formData.username);
          data.append("password", formData.password);
          const result = await LoginUser(data);
    
          if (result.success) {
            setMessage("✅ Account created successfully!");
             router.push("/")
    
            setFormData({
              username: "",
              password: "",
            });
          } else {
            setMessage(`❌ ${result.error}`);
          }
        } catch (error) {
          setMessage("❌ Something went wrong.");
        } finally {
          setLoading(false);
        }
      };
    
  const router = useRouter();


  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-12 px-8 bg-white gap-10">
        {/* Login Form */}
        <div className="border-2 border-gray-300 shadow-lg p-8 rounded-xl flex-1 flex flex-col justify-center max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center mb-10 text-black">
            Login to Exclusive
          </h1>

           <form onSubmit={handleSubmit} className="space-y-4">
          
                      <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
          
                     
          
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
          
          
                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading || isFormInvalid}
                        className={`w-full h-11 rounded-lg font-semibold transition-all ${
                          loading || isFormInvalid
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
                        }`}
                      >
                        {loading ? "Creating Account..." : "Sign Up"}
                      </button>
          
                    
                      {message && (
                        <p
                          className={`text-center mt-2 text-sm ${
                            message.includes("✅")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {message}
                        </p>
                      )}
                    </form>
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
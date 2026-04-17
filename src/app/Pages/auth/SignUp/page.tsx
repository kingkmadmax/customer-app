'use client';

import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/app/Pages/auth/SignUp/actions";

export default function RegisterPage() {
   const router = useRouter(); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message) setMessage("");
  };

  // Validate required fields
  const isFormInvalid =
    !formData.username.trim() ||
    !formData.email.trim() ||
    !formData.password.trim() ||
    !formData.firstName.trim() ||
    !formData.lastName.trim();

  // Handle submit
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
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);

      const result = await registerUser(data);

      if (result.success) {
        setMessage("✅ Account created successfully!");
         router.push("/Pages/auth/LogIn")

        setFormData({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
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

  return (
    <div className="flex min-h-screen  items-center justify-center  text-black ">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-20 px-10 bg-white gap-10">

        {/* Left Side */}
        <div className=" rounded-xl flex-1 flex items-center justify-center overflow-hidden">
          <Image
            src="/PhoneImage.png"
            alt="Phone"
            width={700}
            height={700}
            priority
            className="object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="border border-gray-300 p-8 rounded-xl flex-1 flex flex-col justify-center max-w-md w-full shadow-lg bg-white">

          <h1 className="text-3xl font-bold text-center text-black mb-2">
            Create an Account
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Enter your details below
          </p>

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
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
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

            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />

            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
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

            {/* Google */}
            <div className="flex items-center justify-center gap-3 border border-gray-500 rounded-lg h-11 cursor-pointer hover:bg-gray-50 transition-all">
              <FaGoogle />
              <span>Sign up with Google</span>
            </div>

            {/* Message */}
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
      </main>
    </div>
  );
}
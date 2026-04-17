"use client"
import { useState } from 'react';
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";  
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', process.env.NEXT_PUBLIC_LOGIN_CLIENT_ID!);
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Store tokens (in production: use httpOnly cookies via server action)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        setMessage('✅ Login successful!');
        // Redirect or update UI
        window.location.href = '/';
      } else {
        setMessage(`❌ ${data.error_description || 'Login failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen  items-center justify-center bg-white text-black">
       <main className="flex flex-row  items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white gap-10">
        <div className="border-2 border-gray-300 shadow-lg p-4 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-20">
     <h1 className="text-3xl font-semibold text-center text-black">
            Login into Exclusive
          </h1>
      <form onSubmit={handleLogin} className="space-y-4">
       <div className="space-y-6">
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          required
        />
        </div>
         <div className="flex flex-col w-full ">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white h-10 w-full rounded-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className='flex  mt-10 gap-10'>
                  <a href="/forgot-password" className="text-blue-500 flex  h-10">
                    Forget Password?
                  </a>
            <p className="text-center">
            Don’t have an account?{" "}
            <a href="/Pages/auth/SignUp" className="text-blue-500">Sign Up</a>
          </p>
            </div>
              
        </div>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
        </div>
          <div className="bg-[#D0E6EB] rounded flex-1 flex items-center justify-center relative">
                  <Image
                    className="object-contain"
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
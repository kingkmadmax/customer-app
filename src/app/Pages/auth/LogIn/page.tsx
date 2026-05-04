"use client"
import { useState } from 'react';
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";  
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

   try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // STEP 1: Get the token from Keycloak (via your Server Action)
      const result = await loginUser(formData);

      if (result.success) {
        // STEP 2: Send the token to your Spring Boot backend for validation
        // Using your local Spring Boot port (9090)
        const backendRes = await fetch('http://localhost:9090/api/auth/validate-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${result.access_token}`,
            'Content-Type': 'application/json'
          }
        });

        if (backendRes.ok) {
          // STEP 3: Both systems passed! Store tokens and redirect
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('refresh_token', result.refresh_token);
          
          setMessage('✅ Login and Validation successful!');
          window.location.href = '/';
        } else {
          // The token exists but the backend rejected it (e.g., Role mismatch or Timeout)
          const errorData = await backendRes.json().catch(() => ({}));
          setMessage(`❌ Backend validation failed: ${errorData.message || 'Unauthorized'}`);
        }
      } else {
        setMessage(`❌ ${result.error || 'Login failed'}`);
      }
    } catch (err) {
      console.error("Login sequence error:", err);
      setMessage('❌ Network error. Is the backend running?');
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
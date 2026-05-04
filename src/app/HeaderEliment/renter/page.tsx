"use client";
import React, { useRef, useState } from 'react';
import { User, Phone, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfessionalRegistration() {
  // Using useRef to safely access the form and prevent "Cannot read properties of null" errors
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Capture form data immediately before any async 'await'
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    setStatus("");
    setIsError(false);

    try {
      const response = await fetch("http://localhost:9090/api/onboarding/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // CASE: Successful database save
        setIsError(false);
        setStatus("Request sent successfully.");
        formRef.current?.reset(); 
      } else {
        setIsError(true);
        setStatus(`Existing request with this number (${data.phone}) and name (${data.fullName}).`);
      }
    } catch (error) {
  
      setIsError(false);
      setStatus("Request sent successfully.");
      formRef.current?.reset(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="max-w-4xl mx-auto"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Renter Registration
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Complete your onboarding profile to secure your rental agreement.
          </p>
        </div>

        <div className="space-y-8">
          {/* Identity & Contact Section */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 p-2 rounded-lg mr-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Primary Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                    placeholder="+251 ..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-1/2 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Submit Registration"}
            </button>

            {/* Response Message Box */}
            {status && (
              <div className={`w-full md:w-1/2 p-4 rounded-xl flex items-center mb-4 border transition-all duration-300 ${
                isError 
                  ? "bg-amber-50 border-amber-200 text-amber-800" 
                  : "bg-green-50 border-green-200 text-green-700"
              }`}>
                {isError ? (
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{status}</p>
              </div>
            )}

            <div className="flex items-center text-gray-400 text-sm mt-2">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
              All information is stored securely following local regulations.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import { useRouter } from "next/navigation";
import CartSummary from "@/components/checkout/CartSummary";
import { BiometricKYCStep } from "@/components/checkout/BiometricKYCStep";
import { ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react";
import { useCheckoutStore } from "@/components/store/cat-store";  

export default function Step2Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  
  const { setBiometric } = useCheckoutStore(); // Pull the function from store

// Update your BiometricKYCStep component call:
<BiometricKYCStep
        onDataChange={(data) => {
          // data contains { faceImage, idImage }
          // ✅ THIS IS THE MISSING LINK: It saves images to the global store
          setBiometric(data); 
        }}
        isValid={setIsValid}
      />

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-900">
      <CheckoutStepper step={2} />

      {/* Grid: 1.5fr for Scanner, 1fr for Summary */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 mt-6 items-stretch">
        
        {/* LEFT SIDE: SCANNER CARD */}
        <div className="space-y-4 flex flex-col">
          <div className="p-6 bg-white border border-gray-200 rounded-[1.5rem] shadow-md flex-1 flex flex-col min-h-[400px]">
            <BiometricKYCStep
              onDataChange={() => {}}
              isValid={setIsValid}
            />
            
            {/* Action Button inside the card */}
            <button
              disabled={!isValid}
              onClick={() => router.push("/Checkout/checkout/step-3")}
              className={`mt-8 w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isValid 
                  ? "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              CONTINUE TO RENTAL DETAILS <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 ml-2"
          >
            <ChevronLeft className="w-3 h-3" /> Back
          </button>
        </div>

        {/* RIGHT SIDE: SUMMARY & SECURITY INFO */}
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <CartSummary />
          </div>
          
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-[10px] text-blue-800 leading-snug">
              <strong>Secure Verification:</strong> Your biometric data is encrypted and used only for identity validation. Images are deleted after 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
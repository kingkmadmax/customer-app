"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react";

import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";
import { BiometricKYCStep } from "@/components/checkout/BiometricKYCStep";
import { useCheckoutStore } from "@/components/store/cat-store";

export default function Step2Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  const { setBiometric } = useCheckoutStore();

  const handleBiometricChange = useCallback((data: any) => {
    setBiometric(data);
  }, [setBiometric]);

  const handleNext = () => {
    if (isValid) {
      router.push("/Checkout/checkout/step-3");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-balck">
      <CheckoutStepper step={2} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* LEFT: BIOMETRIC KYC */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-2">
            Biometric Verification
          </h2>

          <p className="text-gray-500 mb-6">
            Complete your identity verification to continue
          </p>

          <div className="min-h-[420px]">
            <BiometricKYCStep
              onDataChange={handleBiometricChange}
              isValid={setIsValid}
            />
          </div>

          {/* Button - Exactly same as Step 1 (location, size, and text color) */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 rounded-lg text-black"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isValid}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT: CART SUMMARY + SECURITY */}
        <div className="space-y-6">
          <div>
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
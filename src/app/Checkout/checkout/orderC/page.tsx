"use client";

import { useState } from "react";
import  CheckoutStepper  from "@/components/CheckoutStepper";
import  CartSummary  from "@/components/CartSummary";
import { BiometricKYCStep } from "@/components/BiometricKYCStep";
import { useRouter } from "next/navigation";

export default function Step2Page() {
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <CheckoutStepper step={2} />

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT */}
        <div className="p-6 border rounded-xl">
          <BiometricKYCStep
            onDataChange={() => {}}
            isValid={setIsValid}
          />
        </div>

        {/* RIGHT */}
        <CartSummary />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>

        <button
          disabled={!isValid}
          onClick={() => router.push("/Checkout/checkout/step-3")}
          className={`px-6 py-2 rounded-lg text-white ${
            isValid ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
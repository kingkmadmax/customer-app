"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutStepper from "@/components/CheckoutStepper";
import CartSummary from "@/components/CartSummary";
import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";

export default function CheckoutStep5() {
   const router = useRouter();
  const { personal, rental } = useCheckoutStore();
  const { cartItems } = useCartStore();


  const [loading, setLoading] = useState(false);

  // 🔥 MOCK DATA (replace later with Zustand / API)


  const handleFinish = async () => {
    setLoading(true);

    // simulate saving order
    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);

    // 🔔 notification
    alert("🎉 Order Successfully Placed!");

    // 🏠 redirect home
    router.push("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* STEP */}
      <CheckoutStepper step={6}  />

      <h1 className="text-2xl font-bold mt-6 mb-6">
        Review & Finish Order
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* ================= LEFT: INFO REVIEW ================= */}
        <div className="border rounded-xl shadow-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Your Information
          </h2>
        
          
        </div>

        {/* ================= RIGHT: CART ================= */}
        <div className="border rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            Cart Summary
          </h2>

          <CartSummary />
        </div>
      </div>

      {/* ================= FINISH BUTTON ================= */}
      <div className="flex justify-end mt-10">

        <button
          onClick={handleFinish}
          disabled={loading}
          className={`px-8 py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Finish Order"}
        </button>
      </div>
    </div>
  );
}
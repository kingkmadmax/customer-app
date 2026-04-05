"use client";

import { useState } from "react";
import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartSummary from "@/components/CartSummary";
import { useRouter } from "next/navigation";

export default function CheckoutStep1() {
  const router = useRouter();

  const { setPersonal } = useCheckoutStore();
  const { cartItems } = useCartStore();

  // Debug logging
  console.log("Checkout page - cartItems:", cartItems);
  console.log("Checkout page - checkout product:", useCheckoutStore.getState().product);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    fid: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     🔥 FIXED NEXT HANDLER
  ========================= */
  const handleNext = () => {
    // ❌ prevent empty form bug
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ save to zustand
    setPersonal(form);

    // 🔥 correct route (make sure it's consistent)
    router.push("/Checkout/checkout/step-3");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Debug info */}
      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
        <h3 className="font-bold">Debug Info:</h3>
        <p>Cart items: {cartItems.length}</p>
        <p>Checkout product: {useCheckoutStore.getState().product ? 'Yes' : 'No'}</p>
      </div>

      <CheckoutStepper step={1} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* =========================
            LEFT: PERSONAL INFO
        ========================= */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-2">
            Personal Information
          </h2>

          <p className="text-gray-500 mb-6">
            Please provide your details to continue
          </p>

          <div className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* PHONE */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* FID */}
            <input
              type="text"
              name="fid"
              placeholder="Fida ID (optional)"
              value={form.fid}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* =========================
            RIGHT: CART SUMMARY
        ========================= */}
        <div>
          <CartSummary />
        </div>
      </div>

      {/* =========================
          NAVIGATION BUTTONS
      ========================= */}
      <div className="flex justify-between mt-10">

        {/* BACK */}
        <button
          onClick={() => router.push("/cart")}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>

        {/* NEXT (FIXED - NO LINK BUG) */}
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>

      </div>
    </div>
  );
}
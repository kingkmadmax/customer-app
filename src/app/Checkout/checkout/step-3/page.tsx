"use client";

import { useState } from "react";
import  CheckoutStepper  from "@/components/CheckoutStepper";
import { useRouter } from "next/navigation";

import CartSummary from "@/components/CartSummary";
import { useCheckoutStore } from "@/components/store/cat-store";

export default function CheckoutStep3() {
  const { setRental } = useCheckoutStore();

const handleNext = () => {
  setRental(form);
  router.push("/checkout/step-4");
};
  const router = useRouter();

  const [form, setForm] = useState({
    location: "",
    receiveDate: "",
    returnDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* STEP BAR */}
      <CheckoutStepper step={3} />

      <div className="grid md:grid-cols-2 gap-8">

        {/* ================= LEFT MAIN FORM ================= */}
        <div className="space-y-6">

          {/* CARD 1 */}
          <div className="p-6 border rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Rental Details
            </h2>

            {/* TEXT INPUT */}
            <div className="mb-4">
              <label className="font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter pickup location"
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            {/* RECEIVING DATE */}
            <div className="mb-4">
              <label className="font-medium">
                Receiving Date
              </label>
              <input
                type="date"
                name="receiveDate"
                value={form.receiveDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            {/* RETURNING DATE */}
            <div>
              <label className="font-medium">
                Returning Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={form.returnDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>
          </div>

          {/* ================= STAGE 2 DIV ================= */}
          <div className="p-6 border rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Additional Options (Stage 2)
            </h2>

            <p className="text-gray-500 mb-4">
              You can extend this section later (insurance, delivery type, etc.)
            </p>

            <input
              type="text"
              placeholder="Extra notes or preferences"
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-6 border rounded-xl shadow-xl">
         <CartSummary />
        </div>
      </div>

      {/* ================= NAV BUTTONS ================= */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>

        <button
          onClick={() => router.push("/Checkout/checkout/payment")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
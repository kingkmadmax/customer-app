"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ArrowRight, Info } from "lucide-react";

import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";
import { useCheckoutStore } from "@/components/store/cat-store";

export default function CheckoutStep3() {
  const router = useRouter();
  const { rental, setRental } = useCheckoutStore();

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    location: rental.location || "",
    receiveDate: rental.receiveDate || "",
    returnDate: rental.returnDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "receiveDate" && updatedForm.returnDate < value) {
      updatedForm.returnDate = value;
    }

    setForm(updatedForm);
    setRental(updatedForm);
  };

  const handleNext = () => {
    if (!form.location || !form.receiveDate || !form.returnDate) {
      alert("Please fill in all rental details");
      return;
    }
    router.push("/Checkout/checkout/step-4");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-balck">
      <CheckoutStepper step={3} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* LEFT: RENTAL DETAILS */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-2">Rental Schedule</h2>
          
          <p className="text-gray-500 mb-6">
            Please provide your rental details
          </p>

          <div className="space-y-6">
            {/* LOCATION */}
            <div>
              <p className="text-bold mb-1">Pickup Location</p>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Airport or Landmark"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* DATES */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-bold mb-1">Receive Date</p>
                <input
                  type="date"
                  name="receiveDate"
                  min={today}
                  value={form.receiveDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <p className="text-bold mb-1">Return Date</p>
                <input
                  type="date"
                  name="returnDate"
                  min={form.receiveDate || today}
                  value={form.returnDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Helper Note */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 leading-snug">
                Pickup and return times default to 10:00 AM. Contact support for custom scheduling.
              </p>
            </div>
          </div>

          {/* Buttons - Exactly same style as Step 1 */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import CheckoutStepper from "@/components/CheckoutStepper";
import { useRouter } from "next/navigation";
import CartSummary from "@/components/CartSummary";
import { useCheckoutStore } from "@/components/store/cat-store";

export default function CheckoutStep3() {
  const router = useRouter();
  const { rental, setRental } = useCheckoutStore();

  // Get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    location: rental.location || "",
    receiveDate: rental.receiveDate || "",
    returnDate: rental.returnDate || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let updatedForm = { ...form, [name]: value };

    // Validation: If user changes receiveDate and it's now after the current returnDate,
    // reset the returnDate to match the new receiveDate to prevent "negative days"
    if (name === "receiveDate" && updatedForm.returnDate < value) {
      updatedForm.returnDate = value;
    }

    setForm(updatedForm);
    setRental(updatedForm); // Sync to CartSummary
  };

  const handleNext = () => {
    if (!form.location || !form.receiveDate || !form.returnDate) {
      alert("Please fill in all rental details");
      return;
    }
    router.push("/Checkout/checkout/payment");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CheckoutStepper step={3} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 border border-gray-300 rounded-xl shadow-xl bg-white">
            <h2 className="text-xl font-bold mb-4">Rental Details</h2>

            {/* LOCATION */}
            <div className="mb-4">
              <label className="font-medium text-sm">Pickup Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter city or airport"
                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              />
            </div>

            <div className="flex gap-4">
              {/* RECEIVE DATE */}
              <div className="mb-4 w-full">
                <label className="font-medium text-sm">Receiving Date</label>
                <input
                  type="date"
                  name="receiveDate"
                  min={today} // Prevents picking a date in the past
                  value={form.receiveDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                />
              </div>

              {/* RETURN DATE */}
              <div className="mb-4 w-full">
                <label className="font-medium text-sm">Returning Date</label>
                <input
                  type="date"
                  name="returnDate"
                  // Prevents picking a return date before the pickup date
                  min={form.receiveDate || today} 
                  value={form.returnDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CART SUMMARY */}
        <CartSummary />
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => router.back()} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
          Back
        </button>

        <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Next Step
        </button>
      </div>
    </div>
  );
}
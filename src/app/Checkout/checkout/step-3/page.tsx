"use client";

import { useState } from "react";
import CheckoutStepper from "@/components/CheckoutStepper";
import { useRouter } from "next/navigation";
import CartSummary from "@/components/CartSummary";
import { useCheckoutStore } from "@/components/store/cat-store";
import { MapPin, Calendar, ArrowRight, Info } from "lucide-react";

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
    router.push("/Checkout/checkout/payment");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-900">
      <CheckoutStepper step={3} />

      {/* Matching the 1.5fr / 1fr Grid from Payment Page */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 mt-6 items-stretch">
        
        {/* LEFT SIDE: RENTAL DETAILS */}
        <div className="space-y-4 flex flex-col">
          
          <div className="p-6 bg-white border border-gray-200 rounded-[1.5rem] shadow-md flex-1 flex flex-col justify-center min-h-[380px]">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-black tracking-tight">Rental Schedule</h2>
            </div>

            <div className="space-y-5">
              {/* LOCATION */}
              <div className="relative">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Pickup Location</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Airport or Landmark"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl text-sm focus:border-blue-600 outline-none bg-gray-50/50"
                  />
                </div>
              </div>

              {/* DATES GRID */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Receive Date</label>
                  <input
                    type="date"
                    name="receiveDate"
                    min={today}
                    value={form.receiveDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm mt-1 focus:border-blue-600 outline-none bg-gray-50/50"
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    min={form.receiveDate || today}
                    value={form.returnDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm mt-1 focus:border-blue-600 outline-none bg-gray-50/50"
                  />
                </div>
              </div>

              {/* HELPER TEXT */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <p className="text-[10px] text-blue-600 leading-tight italic">
                  Note: Pickup and return times default to 10:00 AM. Contact support for custom scheduling.
                </p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button 
              onClick={handleNext} 
              className="mt-8 w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              CONTINUE TO PAYMENT <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => router.back()} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 text-left ml-2">
            ← Previous Step
          </button>
        </div>

        {/* RIGHT SIDE: CART SUMMARY (Matching Payment Page) */}
        <div className="flex flex-col">
          <div className="sticky top-6 flex-1 flex flex-col">
            <div className="flex-1 overflow-hidden">
               <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartSummary from "@/components/CartSummary";

export default function TermsPage() {
    const router = useRouter();
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleFinish = () => {
    if (hasAgreed) router.push("/checkout/step-5");
  };


  const [hasRead, setHasRead] = useState(false);
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);


  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;

    const isBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (isBottom) setHasRead(true);
  };

  const handleAccept = () => {
    if (hasRead && checked) {
      setAccepted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔥 CHECKOUT STEPPER */}
      <CheckoutStepper step={4} totalSteps={5} />

      {/* TITLE */}
      <h1 className="text-2xl font-bold mt-6 mb-6">
        Terms & Conditions
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* ================= LEFT: TERMS ================= */}
        <div className="border rounded-xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-blue-600 text-white p-4">
            <h2 className="font-bold text-lg">
              Rental Terms & Service
            </h2>
            <p className="text-sm text-blue-100">
              Scroll to read before continuing
            </p>
          </div>

          {/* SCROLL AREA */}
          <div
            onScroll={handleScroll}
            className="h-96 overflow-y-auto p-6 text-sm space-y-4"
          >
            <p><b>1.</b> Agreement terms...</p>
            <p><b>2.</b> Responsibility rules...</p>
            <p><b>3.</b> Damage policy...</p>
            <p><b>4.</b> Return policy...</p>
            <p><b>5.</b> Payment terms...</p>
            <p><b>6.</b> Cancellation rules...</p>
            <p><b>7.</b> Legal terms...</p>

            <div className="h-40" />
          </div>

          {/* ================= AGREEMENT ================= */}
          <div className="p-4 border-t bg-gray-50">

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                disabled={!hasRead}
                onChange={(e) => setChecked(e.target.checked)}
              />
              I agree to the Terms & Conditions
            </label>

            <button
              onClick={handleAccept}
              disabled={!checked || accepted}
              className={`w-full mt-3 py-2 rounded-lg text-white transition ${
                accepted
                  ? "bg-green-600"
                  : checked && hasRead
                  ? "bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {accepted ? "Accepted ✓" : "Accept Terms"}
            </button>

            <p className="text-xs mt-2 text-gray-500">
              {accepted
                ? "✔ Terms accepted"
                : !hasRead
                ? "Scroll to enable checkbox"
                : "Ready to accept"}
            </p>
          </div>
        </div>

        {/* ================= RIGHT: CART ================= */}
        <div className="border border-gray-400 rounded-xl shadow-xl p-6">
         

          <CartSummary />
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex justify-between mt-10">

        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>

        <button
          disabled={!accepted}
          onClick={() => router.push("/Checkout/checkout/payment")}
          className={`px-6 py-2 rounded-lg text-white ${
            accepted
              ? "bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
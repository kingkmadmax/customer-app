"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";
import { FileText, CheckCircle2, ChevronLeft, ArrowRight, ShieldCheck, Scale } from "lucide-react";

export default function TermsPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (checked) {
      setAccepted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-balck">
      <CheckoutStepper step={4} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* LEFT: TERMS & CONDITIONS */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-2">Terms & Conditions</h2>
          <p className="text-gray-500 mb-6">
            Please review and accept the rental agreement
          </p>

          <div className="space-y-6">
            {/* Terms List */}
            <div className="space-y-5">
              {[
                { title: "Driver Policy", desc: "Valid license required. Minimum age 21+." },
                { title: "Insurance", desc: "Standard collision coverage included by default." },
                { title: "Fuel & Returns", desc: "Return with same fuel level to avoid fees." },
                { title: "Usage", desc: "No off-roading or smoking inside the vehicle." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Agreement Note */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 italic">
                By accepting, you acknowledge that you have read and agree to all terms of the rental agreement.
              </p>
            </div>

            {/* Checkbox */}
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              checked ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                I Agree to the Terms & Conditions
              </span>
            </label>
          </div>

          {/* Buttons - Same style as all previous steps */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={handleAccept}
              disabled={!checked || accepted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
            >
              {accepted ? "Accepted ✓" : "Accept Terms"}
            </button>
          </div>
        </div>

        {/* RIGHT: CART SUMMARY + PROCEED BUTTON */}
        <div className="space-y-6">
          <CartSummary />

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-sm text-blue-800 leading-snug">
              <strong>Final Confirmation:</strong> You are one step away from securing your rental. 
              No charges are made until the final payment step.
            </p>
          </div>

          {/* Proceed Button - Matching Previous Steps */}
          <button
            disabled={!accepted}
            onClick={() => router.push("/Checkout/checkout/payment")}
            className={`w-full px-6 py-2 rounded-lg font-medium transition-all ${
              accepted 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartSummary from "@/components/CartSummary";
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
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-900">
      <CheckoutStepper step={5} />

      {/* Grid: 1.5fr / 1fr matching your previous steps */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 mt-6 items-stretch">
        
        {/* ================= LEFT: TERMS CARD ================= */}
        <div className="space-y-4 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-[1.5rem] shadow-md overflow-hidden flex-1 flex flex-col min-h-[400px]">
            
            {/* HEADER */}
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-blue-200" />
                <div>
                  <h2 className="font-black italic tracking-tight text-lg">Legal Agreement</h2>
                  <p className="text-[9px] uppercase tracking-widest text-blue-200 font-bold">Review terms below</p>
                </div>
              </div>
              {accepted && <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in" />}
            </div>

            {/* CONTENT AREA (No scroll required to unlock) */}
            <div className="flex-1 p-6 space-y-5">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Driver Policy", desc: "Valid license required. Minimum age 21+." },
                  { title: "Insurance", desc: "Standard collision coverage included by default." },
                  { title: "Fuel & Returns", desc: "Return with same fuel level to avoid fees." },
                  { title: "Usage", desc: "No off-roading or smoking inside the vehicle." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start border-b border-gray-50 pb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-400 italic leading-snug">
                  By clicking accept, you acknowledge that you have read the full digital rental agreement and agree to abide by all safety and payment policies.
                </p>
              </div>
            </div>

            {/* AGREEMENT SECTION */}
            <div className="p-5 border-t bg-white">
              <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                checked ? "border-blue-600 bg-blue-50/50" : "border-gray-100 hover:border-gray-200"
              }`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-black text-gray-700 uppercase tracking-tighter">
                  I Agree to the Terms & Conditions
                </span>
              </label>

              <button
                onClick={handleAccept}
                disabled={!checked || accepted}
                className={`w-full mt-4 py-4 rounded-xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                  accepted
                    ? "bg-emerald-500 text-white shadow-emerald-100"
                    : checked
                    ? "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
              >
                {accepted ? "TERMS ACCEPTED ✓" : "CONFIRM AGREEMENT"}
              </button>
            </div>
          </div>

          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 ml-2"
          >
            <ChevronLeft className="w-3 h-3" /> Previous Step
          </button>
        </div>

        {/* ================= RIGHT: SUMMARY & FINAL NAV ================= */}
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <CartSummary />
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-[10px] text-emerald-800 leading-snug">
              <strong>Final Confirmation:</strong> You are one step away from securing your rental. No charges are made until the final payment step.
            </p>
          </div>

          <button
            disabled={!accepted}
            onClick={() => router.push("/Checkout/checkout/payment")}
            className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
              accepted
                ? "bg-gray-900 text-white shadow-xl hover:bg-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            PROCEED TO PAYMENT <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
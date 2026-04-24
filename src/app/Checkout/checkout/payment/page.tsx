"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Building2, CheckCircle2, ArrowRight, Upload, Copy, ShieldCheck } from "lucide-react";

import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";

type PaymentMethod = "card" | "telebirr" | "bank";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const bankAccounts = [
    { bank: "CBE", acc: "1000123456789", name: "Rental Co. PLC" },
    { bank: "Dashen", acc: "009988776655", name: "Rental Co. PLC" },
  ];

  const teleAccounts = [
    { bank: "TeleBIRR", acc: "0911223344", name: "Rental Co. PLC" },
  ];

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const canProceed = () => {
    if (selectedMethod === "card") return true;
    if (selectedMethod === "bank" || selectedMethod === "telebirr") return !!receiptFile;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-balck">
      <CheckoutStepper step={4} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* LEFT: PAYMENT SECTION */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-2">Payment Method</h2>
          <p className="text-gray-500 mb-6">
            Choose your preferred payment method
          </p>

          {/* Payment Method Tabs */}
          {!isSubmitted && (
            <div className="flex gap-2 mb-6">
              {[
                { id: "card", name: "Card", icon: CreditCard },
                { id: "telebirr", name: "TeleBIRR", icon: Smartphone },
                { id: "bank", name: "Bank Transfer", icon: Building2 },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                  className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all border-2 ${
                    selectedMethod === m.id 
                      ? "border-blue-600 bg-blue-50 text-blue-600" 
                      : "border-transparent text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Main Payment Content */}
          <div className="min-h-[400px]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Payment Received!</h2>
                <p className="text-gray-500 mb-6">Thank you for your payment.</p>
                
                <button 
                  onClick={() => router.push("/Checkout/checkout/step-5")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Bank Transfer */}
                {selectedMethod === "bank" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Bank Transfer</h3>
                    {bankAccounts.map((acc, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                        <div>
                          <p className="text-xs text-blue-600 font-bold">{acc.bank}</p>
                          <p className="font-mono font-medium">{acc.acc}</p>
                        </div>
                        <button className="p-2 hover:bg-white rounded-full">
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50">
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">
                        {receiptFile ? receiptFile.name : "Upload payment receipt"}
                      </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} 
                      />
                    </label>
                  </div>
                )}

                {/* TeleBIRR */}
                {selectedMethod === "telebirr" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">TeleBIRR Payment</h3>
                    {teleAccounts.map((acc, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                        <div>
                          <p className="text-xs text-blue-600 font-bold">{acc.bank}</p>
                          <p className="font-mono font-medium">{acc.acc}</p>
                        </div>
                        <button className="p-2 hover:bg-white rounded-full">
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50">
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">
                        {receiptFile ? receiptFile.name : "Upload payment receipt"}
                      </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} 
                      />
                    </label>
                  </div>
                )}

                {/* Card Payment */}
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Card Payment</h3>
                    <input 
                      placeholder="Card Number" 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        placeholder="MM/YY" 
                        className="p-3 border border-gray-300 rounded-lg" 
                      />
                      <input 
                        placeholder="CVV" 
                        className="p-3 border border-gray-300 rounded-lg" 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Consistent Buttons */}
          {!isSubmitted && (
            <div className="flex justify-between mt-10">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-300 rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleVerification}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div>
          <CartSummary />
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-sm text-blue-800 leading-snug">
              Secure 256-bit payment. Your information is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Building2, CheckCircle2,  ArrowRight, Upload, Copy, ShieldCheck } from "lucide-react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";

type PaymentMethod = "card" | "telebirr" | "bank";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
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

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-900">
      <CheckoutStepper step={4} />

      {/* ✅ Adjusted Grid: 1.5fr for payment, 1fr for summary for a "smaller" look */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 mt-6 items-stretch">
        
        {/* ================= LEFT SIDE: SMALLER PAYMENT CONTENT ================= */}
        <div className="space-y-4 flex flex-col">
          
          {!isSubmitted && (
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm flex gap-2">
              {[
                { id: "card", name: "Card", icon: CreditCard },
                { id: "telebirr", name: "telebirr", icon: Smartphone },
                { id: "bank", name: "Bank", icon: Building2 },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                  className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all border-2 ${
                    selectedMethod === m.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-transparent text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-tighter">{m.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* MAIN ACTION CARD - Reduced padding (p-6) and min-height (min-h-[350px]) */}
          <div className="p-6 bg-white border border-gray-200 rounded-[1.5rem] shadow-md flex-1 flex flex-col justify-center relative overflow-hidden min-h-[380px]">
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center animate-in zoom-in duration-500 text-black text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black mb-1">Done!</h2>
                <p className="text-xs text-gray-500 max-w-[200px]">Payment details received successfully.</p>
                <button 
                  onClick={() => router.push("/Checkout/checkout/step-5")}
                  className="mt-6 px-8 py-3 bg-blue-600 text-black rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  NEXT <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* 🏦 BANK TRANSFER VIEW */}
                {selectedMethod === "bank" && (
                  <div className="space-y-4">
                    <h3 className="text-md font-bold">Bank Transfer</h3>
                    <div className="space-y-2">
                      {bankAccounts.map((acc, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                          <div className="text-sm">
                            <p className="text-[9px] font-bold text-blue-600 uppercase">{acc.bank}</p>
                            <p className="font-mono font-bold">{acc.acc}</p>
                          </div>
                          <button className="p-1.5 hover:bg-white rounded-full"><Copy className="w-3.5 h-3.5 text-gray-400" /></button>
                        </div>
                      ))}
                    </div>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 cursor-pointer">
                      <div className="text-center">
                         <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                         <p className="text-[10px] text-gray-500">{receiptFile ? receiptFile.name : "Upload proof"}</p>
                      </div>
                      <input type="file" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
                    </label>
                    <button onClick={handleVerification} disabled={!receiptFile} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm">CHECK RECEIPT</button>
                  </div>
                )}

                {/* 📱 TELEBIRR VIEW */}
                {selectedMethod === "telebirr" && (
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center">
                      <Smartphone className="text-white w-7 h-7" />
                    </div>
                    <h3 className="text-md font-bold">TeleBIRR</h3>
                    <div className="space-y-2">
                      {teleAccounts.map((acc, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                          <div className="text-sm">
                            <p className="text-[9px] font-bold text-blue-600 uppercase">{acc.bank}</p>
                            <p className="font-mono font-bold">{acc.acc}</p>
                          </div>
                          <button className="p-1.5 hover:bg-white rounded-full"><Copy className="w-3.5 h-3.5 text-gray-400" /></button>
                        </div>
                      ))}
                    </div>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 cursor-pointer">
                      <div className="text-center">
                         <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                         <p className="text-[10px] text-gray-500">{receiptFile ? receiptFile.name : "Upload proof"}</p>
                      </div>
                      <input type="file" className="hidden" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} />
                    </label>
                    <button onClick={handleVerification} disabled={!receiptFile} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm">CHECK RECEIPT</button>
                  </div>
                )}

                {/* 💳 CARD VIEW */}
                {selectedMethod === "card" && (
                   <div className="space-y-3">
                     <h3 className="text-md font-bold">Card Payment</h3>
                     <input placeholder="Card Number" className="w-full p-3 border rounded-xl bg-gray-50 text-sm" />
                     <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM/YY" className="p-3 border rounded-xl bg-gray-50 text-sm" />
                        <input placeholder="CVV" className="p-3 border rounded-xl bg-gray-50 text-sm" />
                     </div>
                     <button onClick={handleVerification} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm">SUBMIT CARD</button>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE: SUMMARY ================= */}
        <div className="flex flex-col">
          <div className="sticky top-6 flex-1 flex flex-col gap-3">
            <div className="flex-1 overflow-hidden">
               {/* Make sure CartSummary is flexible */}
              <CartSummary />
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-2">
               <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
               <p className="text-[9px] text-emerald-800 leading-tight">
                 Secure 256-bit payment. Deposits are refundable.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}









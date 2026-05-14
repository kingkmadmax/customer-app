"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Building2, CheckCircle2, Upload, Copy, ShieldCheck } from "lucide-react";
import { useOrderTotal } from "@/components/ui/CartSummary";
import { useCheckoutStore } from "@/components/store/cat-store";
import CheckoutStepper from "@/components/ui/CheckoutStepper";
import CartSummary from "@/components/ui/CartSummary";

type PaymentMethod = "card" | "telebirr" | "bank";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { finalTotal } = useOrderTotal();
  const { personal } = useCheckoutStore();

  const bankAccounts = [
    { bank: "CBE", acc: "1000123456789", name: "Rental Co. PLC" },
    { bank: "Dashen", acc: "009988776655", name: "Rental Co. PLC" },
  ];

  const teleAccounts = [
    { bank: "TeleBIRR", acc: "0911223344", name: "Rental Co. PLC" },
  ];

  const handlePayment = async () => {
    if (finalTotal <= 0) {
      alert("Invalid amount");
      return;
    }

    setLoading(true);

    try {
      const txRef = `TX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const payload = {
        amount: finalTotal.toFixed(2),
        currency: "ETB",
        email: personal.email?.trim() || "customer@gmail.com",
        first_name: personal.name ? personal.name.split(" ")[0] : "Customer",
        last_name: personal.name ? personal.name.split(" ").slice(1).join(" ") : "User",
        phone_number: personal.phone || "0912345678",
        tx_ref: txRef,
        callback_url: "https://webhook.site/#!/",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/Checkout/checkout/step-5`
      };

      console.log("Sending to Chapa:", payload);

      const response = await fetch("http://localhost:9090/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Backend Error:", responseText);
        alert(`Payment failed (${response.status}): ${responseText || "Unknown error"}`);
        return;
      }

      if (responseText.startsWith("https")) {
        window.location.href = responseText;
      } else {
        alert("Invalid checkout URL received from server");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Cannot connect to backend server. Make sure Spring Boot is running on port 9090.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = () => {
    setIsSubmitted(true);
  };

  const canProceed = () => {
    if (selectedMethod === "card") return true;
    return !!receiptFile;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CheckoutStepper step={5} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        {/* LEFT: Payment Section */}
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-2">Payment Method</h2>
          <p className="text-gray-500 mb-6">Choose your preferred payment method</p>

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

          {/* Main Content */}
          <div className="min-h-[400px]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Payment Received!</h2>
                <p className="text-gray-500 mb-6">Thank you for your payment.</p>
                <button 
                  onClick={() => router.push("/Checkout/checkout/step-5")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Card Payment */}
                {selectedMethod === "card" && (
                  <div className="max-w-2xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>

                    <div className="bg-white p-8 rounded-2xl border mb-8 text-center">
                      <p className="text-gray-600">Total Amount to Pay</p>
                      <p className="text-5xl font-bold text-gray-900 mt-3">
                        ${finalTotal.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition"
                    >
                      {loading ? "Redirecting to Chapa..." : `Pay $${finalTotal.toFixed(2)} with Chapa`}
                    </button>
                  </div>
                )}

                {/* Bank & TeleBIRR (Receipt Upload) */}
                {(selectedMethod === "bank" || selectedMethod === "telebirr") && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">
                      {selectedMethod === "bank" ? "Bank Transfer" : "TeleBIRR Payment"}
                    </h3>
                    
                    {(selectedMethod === "bank" ? bankAccounts : teleAccounts).map((acc, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center border">
                        <div>
                          <p className="text-xs text-blue-600 font-bold">{acc.bank}</p>
                          <p className="font-mono font-medium">{acc.acc}</p>
                        </div>
                        <Copy className="w-5 h-5 text-gray-400 cursor-pointer" />
                      </div>
                    ))}

                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {receiptFile ? receiptFile.name : "Upload Payment Receipt"}
                      </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} 
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Buttons */}
          {!isSubmitted && (
            <div className="flex justify-between mt-10">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
              >
                Back
              </button>

              <button
                onClick={selectedMethod === "card" ? handlePayment : handleVerification}
                disabled={!canProceed() || loading}
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition"
              >
                {selectedMethod === "card" 
                  ? (loading ? "Processing..." : "Pay with Chapa") 
                  : "Submit"}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Order Summary */}
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
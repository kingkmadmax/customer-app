"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Building2, Check } from "lucide-react";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartSummary from "@/components/CartSummary";

type PaymentMethod = "card" | "wallet" | "bank";

export default function PaymentPage() {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [isValid, setIsValid] = useState(false);

  // ✅ VALIDATION
  useEffect(() => {
    if (selectedMethod === "card") {
      const valid =
        cardNumber.replace(/\s/g, "").length === 16 &&
        cardHolder.trim().length >= 3 &&
        expiryDate.length === 5 &&
        cvv.length === 3;

      setIsValid(valid);
    } else {
      setIsValid(true);
    }
  }, [selectedMethod, cardNumber, cardHolder, expiryDate, cvv]);

  // FORMATTERS
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    return cleaned;
  };

  // ✅ SAVE + NEXT
  const handleNext = () => {
    const paymentData = {
      method: selectedMethod,
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
    };

    localStorage.setItem("payment-data", JSON.stringify(paymentData));

    router.push("/Checkout/checkout/step-5");
  };

  const methods = [
    { id: "card", name: "Card", icon: CreditCard },
    { id: "wallet", name: "Wallet", icon: Wallet },
    { id: "bank", name: "Bank", icon: Building2 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* ================= STEP BAR ================= */}
      <CheckoutStepper step={4} />

      <div className="grid md:grid-cols-2 gap-8 mt-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">

          {/* PAYMENT METHOD CARD */}
          <div className="p-6 border rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {methods.map((m) => {
                const Icon = m.icon;
                const active = selectedMethod === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                    className={`p-4 border rounded-xl cursor-pointer text-center relative ${
                      active
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <Icon className="mx-auto mb-2" />
                    <p className="font-semibold">{m.name}</p>

                    {active && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD DETAILS */}
          {selectedMethod === "card" && (
            <div className="p-6 border rounded-xl shadow-xl">
              <h2 className="text-xl font-bold mb-4">
                Card Details
              </h2>

              <div className="space-y-4">

                <input
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg"
                />

                <input
                  value={cardHolder}
                  onChange={(e) =>
                    setCardHolder(e.target.value.toUpperCase())
                  }
                  placeholder="Card Holder"
                  className="w-full p-3 border rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiryDate(e.target.value))
                    }
                    placeholder="MM/YY"
                    className="p-3 border rounded-lg"
                  />

                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value.replace(/\D/g, "").slice(0, 3)
                      )
                    }
                    placeholder="CVV"
                    className="p-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OPTIONAL SECTION */}
          <div className="p-6 border rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Additional Options
            </h2>

            <input
              type="text"
              placeholder="Notes or preferences"
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
          onClick={handleNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg text-white ${
            isValid
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
"use client";

import Image from "next/image";
import { useCartStore, useCheckoutStore } from "../store/cat-store";

export default function CartSummary() {
  const { cartItems } = useCartStore();
  const { product, rentalDays = 1 } = useCheckoutStore();

  // Combine cart items and checkout product
  const checkoutItem = product && !cartItems.some((item) => item.id === product.id)
    ? [{ ...product, quantity: 1 }]
    : [];

  const summaryItems = [...cartItems, ...checkoutItem];

  // Calculations
  const subtotal = summaryItems.reduce((acc, item) => {
    return acc + (item.price * (item.quantity || 1) * rentalDays);
  }, 0);

  const totalDeposit = summaryItems.reduce((acc, item) => {
    const depValue = item.deposite ?? item.deposite ?? 0;
    return acc + Number(depValue) * (item.quantity || 1);
  }, 0);

  const serviceFee = subtotal * 0.1;
  const finalTotal = subtotal + serviceFee + totalDeposit;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

      {summaryItems.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="space-y-6 max-h-[340px] overflow-y-auto pr-3 custom-scrollbar">
            {summaryItems.map((item) => {
              const itemTotal = item.price * (item.quantity || 1) * rentalDays;
              const imageSrc = Array.isArray(item.image) && item.image.length > 0
                ? item.image[0]
                : (typeof item.image === "string" && item.image.trim() ? item.image : "/placeholder.jpg");

              return (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <p className="font-semibold text-gray-800 line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">
                      ${item.price} × {item.quantity || 1} × {rentalDays} days
                    </p>
                  </div>

                  <div className="text-right font-semibold text-gray-900 pt-1">
                    ${itemTotal.toFixed(0)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-6" />

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Rental Period</span>
              <span className="font-medium">{rentalDays} days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-emerald-600">
              <span>Service Fee (10%)</span>
              <span>+${serviceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-orange-600">
              <span>Security Deposit</span>
              <span>+${totalDeposit.toFixed(2)}</span>
            </div>

            {/* Total */}
            <div className="pt-4 mt-4 border-t border-gray-900 flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-900">Total Due</span>
              <span className="text-2xl font-bold text-gray-900">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <p className="text-[10px] text-gray-400 text-right italic">
              * Security deposit is fully refundable upon safe return
            </p>
          </div>
        </>
      )}
    </div>
  );
}
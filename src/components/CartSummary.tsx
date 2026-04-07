"use client";

import Image from "next/image";
import { useCartStore, useCheckoutStore } from "./store/cat-store";

export default function CartSummary() {
  const { cartItems } = useCartStore();
  const { product, rentalDays } = useCheckoutStore();

  // Combine cart items and the specific checkout product
  const checkoutItem =
    product && !cartItems.some((item) => item.id === product.id)
      ? [{ ...product, quantity: 1 }]
      : [];

  // Type-casting as any to avoid 'deposite' missing errors if interfaces aren't updated yet
  const summaryItems = [...cartItems, ...checkoutItem] as any[];

  // ==========================================
  // CALCULATIONS (NO DIVISION BY 30)
  // ==========================================
  
  // Subtotal = Price * Quantity * Days
  const subtotal = summaryItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity * rentalDays);
  }, 0);

  // Total Deposit = Sum of all individual deposite values
  const totalDeposit = summaryItems.reduce((acc, item) => {
    return acc + (Number(item.deposite ?? 0) * item.quantity);
  }, 0);

  const serviceFee = subtotal * 0.1; // 10% Fee
  const finalTotal = subtotal + serviceFee + totalDeposit;

  return (
    <div className="p-6 border border-gray-300 rounded-2xl shadow-xl flex flex-col h-[600px] bg-white sticky top-10">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Cart Summary</h2>

      {summaryItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* ✅ SCROLLABLE ITEM LIST */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
            {summaryItems.map((item) => {
              // Flat calculation: Price * Qty * Days
              const itemRentalTotal = item.price * item.quantity * rentalDays;

              return (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image 
                          src={Array.isArray(item.image) ? item.image[0] : (item.image || "/placeholder.jpg")} 
                          alt={item.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-gray-500 font-medium">
                          ${item.price.toFixed(2)} / day | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-gray-900">
                      ${itemRentalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* DEPOSIT DISPLAY */}
                  {(item.deposite ?? 0) > 0 && (
                    <div className="flex justify-between items-center bg-orange-50 px-3 py-1 rounded-lg">
                      <span className="text-[10px] text-orange-700 font-bold uppercase">Security Deposit</span>
                      <span className="text-[11px] text-orange-700 font-bold">
                        +${(Number(item.deposite) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ✅ TOTALS FOOTER */}
          <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rental Duration</span>
              <span className="font-semibold">{rentalDays} Days</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rental Subtotal</span>
              <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-emerald-600 font-medium">
              <span>Service Fee (10%)</span>
              <span>+${serviceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-orange-600 font-bold">
              <span>Total Security Deposit</span>
              <span>+${totalDeposit.toFixed(2)}</span>
            </div>

            <div className="flex flex-col pt-4 border-t-2 border-gray-900 mt-2">
              <div className="flex justify-between font-black text-2xl text-blue-900">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-right mt-1 italic">
                *Deposit is refundable after the rental period.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
import Image from "next/image";

import { useCartStore, useCheckoutStore } from "./store/cat-store";
export default function CartSummary() {
    
     const { cartItems } = useCartStore();
     const { product } = useCheckoutStore();

     // Debug logging
     console.log("CartSummary - cartItems:", cartItems);
     console.log("CartSummary - checkout product:", product);

     const checkoutItem =
       product && !cartItems.some((item) => item.id === product.id)
         ? [{
             id: product.id,
             name: product.name,
             image: product.image,
             price: product.price,
             quantity: 1,
           }]
         : [];

     const summaryItems = [...cartItems, ...checkoutItem];

     console.log("CartSummary - summaryItems:", summaryItems);

     const subtotal = summaryItems.reduce(
         (acc, item) => acc + item.price * item.quantity,
         0
       );
     
       const serviceFee = subtotal * 0.1;
       const total = subtotal + serviceFee;
    return (
        <div className="p-6 border border-gray-300 rounded-xl shadow-xl flex flex-col h-[500px]">
  <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

  {summaryItems.length === 0 ? (
    <p className="text-gray-500">Your cart is empty</p>
  ) : (
    <>
      {/* ✅ SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {summaryItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-3"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.quantity} × ${item.price}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <span className="font-semibold text-sm">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* ✅ FIXED TOTAL SECTION */}
      <div className="mt-4 pt-4 border-t space-y-3 bg-white">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Service Fee (10%)</span>
          <span>+${serviceFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </>
  )}
</div>
    )
}
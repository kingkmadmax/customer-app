"use client";

import { useCartStore } from "@/components/store/cat-store";

export function CartPopup() {
  const { message, showMessage } = useCartStore();

  if (!showMessage) return null;

  return (
    <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}

"use client";

import Image from "next/image";

interface ProductDetailProps {
  product: {
    name: string;
    image: string;
    description: string;
    price: number;
    category: string;
    conditon: string;
  } | null; // 
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  if (!product) return null; 

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="w-full sm:w-1/2 h-64 sm:h-auto relative">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info */}
          <div className="p-6 sm:w-1/2 flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.category} | {product.conditon}</p>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-500 font-semibold text-lg">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
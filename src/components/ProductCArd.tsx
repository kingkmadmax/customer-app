import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";
import { Product } from "@/components/Product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="p-4" style={{ width: "25%" }}>
      <div className="relative border rounded-lg overflow-hidden">
        <div className="relative h-40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="bg-white p-1 rounded-full shadow">
            <FaHeart />
          </button>
          <button className="bg-white p-1 rounded-full shadow">
            <FaEye />
          </button>
        </div>

        <div className="pt-2 space-y-1">
          <h2 className="text-sm font-semibold">{product.name}</h2>
          <p className="text-blue-600 font-bold">
            ${product.price}
          </p>

          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < product.rating ? "★" : "☆"}
              </span>
            ))}
            <p className="ml-2 text-sm text-gray-400">
              {product.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
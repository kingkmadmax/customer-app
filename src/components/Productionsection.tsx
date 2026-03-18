import ProductCarousel from "./ProductCarousel";
import { Product } from "@/components/Product";

type Props = {
  title: string;
  products: Product[];
};

export default function ProductSection({
  title,
  products,
}: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ProductCarousel products={products} />
    </div>
  );
}
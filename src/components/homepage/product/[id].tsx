import { useRouter } from "next/router";
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  conditon: string;
  category?: string;
}

// Define props type
interface ProductPageProps {
  products: Product[];
}

export default function ProductPage({ products }:ProductPageProps) {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-full rounded-lg mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <p className="text-gray-500">Condition: {product.conditon}</p>
      {product.category && <p className="text-gray-500">Category: {product.category}</p>}
    </div>
  );
}
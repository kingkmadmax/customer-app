import { Product } from "@/lib/type";
import Card from "./Card";

interface CardsProps {
  card: Product[];
  gap?: string;
}

export default function Cards({ card = [], gap = "gap-6" }: CardsProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gap} w-full justify-items-center`}>
      {card.length > 0 ? (
        card.map((product) => (
          <Card
            key={product.id}
            product={product}
            onQuickView={(p) => console.log("Quick View:", p.name)}
            onFavorite={(p) => console.log("Favorite:", p.name)}
           
            onRentNow={(p) => console.log("Rent Now:", p.name)}
            isFavorite={false} // Will be dynamic later
          />
        ))
      ) : (
        <p className="col-span-full text-center py-10 text-gray-500">No products available</p>
      )}
    </div>
  );
}
import { Product } from "@/lib/type";
import Card from "./Card";
import { useFavoriteStore } from "@/components/store/favorite-store";

interface CardsProps {
  card: Product[];
  gap?: string;
}

export default function Cards({ card = [], gap = "gap-6" }: CardsProps) {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 ${gap || "gap-3 sm:gap-3"} w-full justify-items-center`}>
      {card.length > 0 ? (
        card.map((product) => (
          <Card
            key={product.id}
            product={product}
            onQuickView={(p) => console.log("Quick View:", p.name)}
            onFavorite={toggleFavorite}
            onRentNow={(p) => console.log("Rent Now:", p.name)}
            isFavorite={favorites.some((f) => f.id === product.id)}
          />
        ))
      ) : (
        <p className="col-span-full text-center py-10 text-gray-500">No products available</p>
      )}
    </div>
  );
}
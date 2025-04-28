'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import ProductCard from '@/components/restaurant/ProductCard';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import Typography from '@/components/Typography';
import { restaurants, type Restaurant } from '@/constants/mock';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RestaurantDetailsPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the restaurant by ID
    const id = params.id as string;
    const foundRestaurant = restaurants.find((r) => r.id === id);

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }

    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col w-full bg-neutral-100">
      <RestaurantHeader restaurant={restaurant} />

      {/* Categorias de produtos */}
      <div className="p-4">
        {restaurant.productCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Typography variant="16-bold-700" className="text-neutral-800">
                  {category.name}
                </Typography>
                {category.description && (
                  <Typography
                    variant="14-regular-400"
                    className="text-neutral-500 mt-1"
                  >
                    {category.description}
                  </Typography>
                )}
              </div>
              {/* Ícone de expandir/colapsar */}
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Lista de produtos */}
            <div className="flex flex-col gap-4">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

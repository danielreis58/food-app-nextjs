'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import ProductAccordion from '@/components/restaurant/ProductAccordion';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import { restaurants, type Restaurant } from '@/constants/mock';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RestaurantDetailsPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restaurantId = params.restaurantId as string;
    const foundRestaurant = restaurants.find((r) => r.id === restaurantId);

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }

    setLoading(false);
  }, [params.restaurantId]);

  if (loading) {
    return <Loading />;
  }

  if (!restaurant) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col w-full">
      <RestaurantHeader restaurant={restaurant} />

      <div className="flex flex-col gap-1 bg-neutral-100">
        {restaurant.productCategories.map((category) => (
          <ProductAccordion
            key={category.id}
            category={category}
            restaurantId={restaurant.id}
          />
        ))}
      </div>
    </div>
  );
}

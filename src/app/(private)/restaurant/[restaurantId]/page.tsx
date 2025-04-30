'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import Header from '@/components/restaurant/Header';
import Info from '@/components/restaurant/Info';
import ProductAccordion from '@/components/restaurant/ProductAccordion';
import { restaurants, type Restaurant } from '@/constants/mock';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CartFormValues } from '../../../../validators/cart';

export default function RestaurantDetailsPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const methods = useFormContext<CartFormValues>();

  useEffect(() => {
    const restaurantId = params.restaurantId as string;
    const foundRestaurant = restaurants.find((r) => r.id === restaurantId);

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      methods.setValue('selectedRestaurantId', foundRestaurant.id, {
        shouldValidate: true,
      });
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
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />

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

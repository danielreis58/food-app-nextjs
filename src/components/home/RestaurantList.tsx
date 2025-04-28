'use client';

import Typography from '@/components/Typography';
import { Restaurant } from '@/constants/mock';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import RestaurantCard from './RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
  searchQuery?: string;
}

export default function RestaurantList({
  restaurants,
  searchQuery = '',
}: RestaurantListProps) {
  const t = useTranslations('RestaurantList');

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.categories?.some((category) =>
          category.toLowerCase().includes(searchLower),
        ) ||
        restaurant.location.toLowerCase().includes(searchLower)
      );
    });
  }, [restaurants, searchQuery]);

  const openRestaurants = useMemo(() => {
    return filteredRestaurants.filter((restaurant) => restaurant.isOpen);
  }, [filteredRestaurants]);

  const closedRestaurants = useMemo(() => {
    return filteredRestaurants.filter((restaurant) => !restaurant.isOpen);
  }, [filteredRestaurants]);

  return (
    <div className="flex flex-col w-full gap-4">
      {openRestaurants.length > 0 && (
        <section>
          <Typography variant="20-extrabold-800" className="text-primary mb-4">
            {t('Open')}
          </Typography>
          <div className="flex flex-col gap-3">
            {openRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {closedRestaurants.length > 0 && (
        <section className="mt-4">
          <Typography variant="20-extrabold-800" className="text-primary mb-4">
            {t('Closed')}
          </Typography>
          <div className="flex flex-col gap-3">
            {closedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {filteredRestaurants.length === 0 && (
        <div className="flex justify-center items-center py-8">
          <Typography variant="16-bold-700" className="text-gray-400">
            {t('NoResults')}
          </Typography>
        </div>
      )}
    </div>
  );
}

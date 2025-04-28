'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
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

  return <div className="container mx-auto p-4"></div>;
}

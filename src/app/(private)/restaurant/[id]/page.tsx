'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import ProductCard from '@/components/restaurant/ProductCard';
import Typography from '@/components/Typography';
import { restaurants, type Restaurant } from '@/constants/mock';
import Image from 'next/image';
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
      {/* Cabeçalho do restaurante */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative rounded-lg overflow-hidden">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex flex-col">
            <Typography variant="20-extrabold-800" className="text-white">
              {restaurant.name}
            </Typography>

            <div className="flex items-center mt-1">
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 relative overflow-hidden mr-1">
                  <Image src="/svg/icons/star.svg" alt="Rating" fill />
                </div>
                <Typography variant="14-bold-700" className="text-white">
                  {restaurant.rating} de 5
                </Typography>
              </div>

              <div className="flex items-center">
                <Typography variant="14-bold-700" className="text-white">
                  {restaurant.delivery.time} • {restaurant.delivery.distance}
                </Typography>
              </div>
            </div>

            <div className="flex items-center mt-1">
              {restaurant.delivery.type === 'free' ? (
                <Typography variant="14-bold-700" className="text-teal-300">
                  entrega grátis acima de R${' '}
                  {restaurant.delivery.freeDeliveryOver?.toFixed(2)}
                </Typography>
              ) : (
                <Typography variant="14-bold-700" className="text-white">
                  entrega R$ {restaurant.delivery.price?.toFixed(2)}
                </Typography>
              )}
            </div>

            <Typography variant="14-regular-400" className="text-white mt-1">
              pedido mínimo: R$ {restaurant.minimumOrder.toFixed(2)}
            </Typography>

            {restaurant.openHours && (
              <Typography variant="14-regular-400" className="text-white mt-1">
                {restaurant.openHours}
              </Typography>
            )}
          </div>
        </div>
      </div>

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

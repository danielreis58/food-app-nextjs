'use client';

import Typography from '@/components/Typography';
import { type Product } from '@/constants/mock';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white p-4 cursor-pointer">
      <div className="grid grid-cols-5 gap-2 items-center">
        <div className="flex flex-col gap-1 col-span-3">
          <div className="flex gap-2">
            {product.image && (
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Typography variant="14-semi-600" className="text-neutral-800">
                  {product.name}
                </Typography>
                {product.tags.includes('spicy') && (
                  <div className="w-4 h-4 relative">
                    <Image src="/svg/icons/spicy.svg" alt="Spicy" fill />
                  </div>
                )}
                {product.tags.includes('vegetarian') && (
                  <div className="w-4 h-4 relative">
                    <Image
                      src="/svg/icons/vegetarian.svg"
                      alt="Vegetarian"
                      fill
                    />
                  </div>
                )}
              </div>
              <Typography
                variant="14-regular-400"
                className="text-neutral-500 line-clamp-2"
              >
                {product.description}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 col-span-2">
          {product.sizes && (
            <Typography variant="12-bold-700" className="text-neutral-500">
              a partir de
            </Typography>
          )}
          {product.discountPrice ? (
            <div className="gap-1 flex flex-col items-end">
              <Typography
                variant="12-bold-700"
                className="text-neutral-500 line-through"
              >
                {`R$ ${product.price.toFixed(2)}`}
              </Typography>
              <div className="flex items-center gap-1 text-green-600">
                <CircleDollarSign className="size-4" strokeWidth={1.5} />
                <Typography variant="14-bold-700">
                  {`R$ ${product.discountPrice.toFixed(2)}`}
                </Typography>
              </div>
            </div>
          ) : (
            <Typography variant="14-bold-700" className="text-primary">
              {`R$ ${product.price.toFixed(2)}`}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

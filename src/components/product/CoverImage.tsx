'use client';

import { type Product } from '@/constants/mock';
import Image from 'next/image';

type AddonsProps = {
  product: Product;
};
export default function Addons({ product }: AddonsProps) {
  return (
    product.image && (
      <div className="w-full h-48 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
    )
  );
}

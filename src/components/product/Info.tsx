'use client';

import Typography from '@/components/Typography';
import { type Product } from '@/constants/mock';

type InfoProps = {
  product: Product;
};

export default function Info({ product }: InfoProps) {
  const { sizeOptions } = product;
  return (
    <div>
      <Typography variant="20-bold-700" className="mb-2">
        {product.name}
      </Typography>

      <div className="flex items-center gap-2 mb-2">
        {sizeOptions?.items && (
          <Typography variant="14-bold-800" className="text-neutral-500">
            a partir de
          </Typography>
        )}
        <Typography variant="18-extrabold-800" className="text-primary">
          {`R$ ${(product.discountPrice || product.price).toFixed(2)}`}
        </Typography>
      </div>
      <Typography variant="14-regular-400" className="text-neutral-500">
        {product.description}
      </Typography>
    </div>
  );
}

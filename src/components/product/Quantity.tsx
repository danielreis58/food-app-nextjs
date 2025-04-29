'use client';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { type Product } from '@/constants/mock';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

type QuantityProps = {
  product: Product;
};

export default function Quantity({ product }: QuantityProps) {
  const t = useTranslations();

  const methods = useFormContext();

  const { watch, setValue } = methods;

  const quantity = watch('quantity');
  const selectedSize = watch('selectedSize');
  const selectedCutlery = watch('selectedCutlery');
  const selectedExtras = watch('selectedExtras') || [];

  const { sizeOptions, extraOptions, cutleryOptions } = product;

  // Calculate current price based on selected options
  const calculateCurrentPrice = () => {
    let basePrice = product.discountPrice || product.price;

    // Add size price
    if (sizeOptions?.items && selectedSize) {
      const size = sizeOptions?.items.find((s) => s.id === selectedSize);
      if (size) {
        basePrice = size.discountPrice > 0 ? size.discountPrice : size.price;
      }
    }

    // Add extras price
    if (extraOptions?.items && selectedExtras.length > 0) {
      for (const extraId of selectedExtras) {
        const extra = extraOptions?.items.find((e) => e.id === extraId);
        if (extra) {
          basePrice += extra.price;
        }
      }
    }

    // Add cutlery price
    if (cutleryOptions?.items && selectedCutlery) {
      const cutlery = cutleryOptions?.items.find(
        (c) => c.id === selectedCutlery,
      );
      if (cutlery) {
        basePrice += cutlery.price;
      }
    }

    return basePrice * quantity;
  };

  const incrementQuantity = () => {
    setValue('quantity', quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setValue('quantity', quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex flex-col gap-2">
        <Typography variant="16-bold-700" className="text-neutral-700">
          {t('Quantity.HowMany')}
        </Typography>
        <div className="flex items-center gap-1">
          <Typography variant="14-semi-600" className="text-neutral-500">
            {t('Quantity.Total')}:
          </Typography>
          <Typography variant="14-bold-700" className="text-neutral-700">
            R$ {calculateCurrentPrice().toFixed(2)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center">
        {quantity === 0 ? (
          <Button
            className="text-white bg-neutral-500 rounded-lg hover:bg-neutral-700"
            onClick={incrementQuantity}
            type="button"
          >
            {t('Common.Add')}
          </Button>
        ) : (
          <div className="flex items-center">
            <button
              type="button"
              className="items-center justify-center text-teal-400 hover:text-teal-600 cursor-pointer"
              onClick={decrementQuantity}
            >
              {quantity === 1 ? (
                <Trash2 className="size-7" strokeWidth={1.5} />
              ) : (
                <CircleMinus className="size-8" strokeWidth={1} />
              )}
            </button>
            <Typography variant="16-bold-700" className="mx-4">
              {quantity}
            </Typography>
            <button
              type="button"
              className="items-center justify-center text-teal-400 hover:text-teal-600 cursor-pointer"
              onClick={incrementQuantity}
            >
              <CirclePlus className="size-8" strokeWidth={1} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { type Product } from '@/constants/mock';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CartFormValues } from '../../validators/cart';
import { ProductFormValues } from '../../validators/products';

type QuantityProps = {
  product: Product;
  productIdx: number;
  selectedProduct: ProductFormValues;
};

export default function Quantity({
  product,
  productIdx,
  selectedProduct,
}: QuantityProps) {
  const t = useTranslations();

  const methods = useFormContext<CartFormValues>();

  const { setValue } = methods;

  const {
    quantity = 0,
    selectedSizeId,
    selectedCutleryId,
    selectedExtraIds,
  } = selectedProduct || {};

  const { sizeOptions, extraOptions, cutleryOptions } = product;

  // Calculate current price based on selected options
  const calculateCurrentPrice = () => {
    let basePrice = product.discountPrice || product.price;

    // Add size price
    if (sizeOptions?.items && selectedSizeId) {
      const size = sizeOptions?.items.find((s) => s.id === selectedSizeId);
      if (size) {
        basePrice = size.discountPrice > 0 ? size.discountPrice : size.price;
      }
    }

    // Add extras price
    if (
      extraOptions?.items &&
      selectedExtraIds &&
      selectedExtraIds.length > 0
    ) {
      for (const extraId of selectedExtraIds) {
        const extra = extraOptions?.items.find((e) => e.id === extraId);
        if (extra) {
          basePrice += extra.price;
        }
      }
    }

    // Add cutlery price
    if (cutleryOptions?.items && selectedCutleryId) {
      const cutlery = cutleryOptions?.items.find(
        (c) => c.id === selectedCutleryId,
      );
      if (cutlery) {
        basePrice += cutlery.price;
      }
    }

    return basePrice * quantity;
  };

  const incrementQuantity = () => {
    const updatedProduct = {
      ...selectedProduct,
      quantity: quantity + 1,
    };

    setValue(`selectedProducts.${productIdx}`, updatedProduct);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const updatedProduct = {
        ...selectedProduct,
        quantity: quantity - 1,
      };

      setValue(`selectedProducts.${productIdx}`, updatedProduct);
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

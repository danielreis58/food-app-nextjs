'use client';

import Typography from '@/components/Typography';
import { CartFormValues } from '@/validators/cart';
import { ProductFormValues } from '@/validators/products';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

type QuantityProps = {
  productIdx: number;
  selectedProduct: ProductFormValues;
};

function QuantityControl({ productIdx, selectedProduct }: QuantityProps) {
  const methods = useFormContext<CartFormValues>();

  const { setValue } = methods;

  const { quantity = 0 } = selectedProduct || {};

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
  );
}

export default QuantityControl;

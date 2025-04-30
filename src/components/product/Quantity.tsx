'use client';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { type Product } from '@/constants/mock';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { calculateCurrentPrice } from '../../lib/utils';
import { CartFormValues } from '../../validators/cart';
import { ProductFormValues } from '../../validators/products';
import QuantityControl from '../QuantityControl';

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

  const { quantity = 0 } = selectedProduct || {};

  const incrementQuantity = () => {
    const updatedProduct = {
      ...selectedProduct,
      quantity: quantity + 1,
    };

    setValue(`selectedProducts.${productIdx}`, updatedProduct);
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
            R$ {calculateCurrentPrice(product, selectedProduct).toFixed(2)}
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
          <QuantityControl productIdx={0} selectedProduct={selectedProduct} />
        )}
      </div>
    </div>
  );
}

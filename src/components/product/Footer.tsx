'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CartFormValues } from '../../validators/cart';
import { ProductFormValues } from '../../validators/products';
import Typography from '../Typography';
import { Button } from '../ui/Button';

export default function Footer() {
  const t = useTranslations('ProductFooter');
  const methods = useFormContext<CartFormValues>();

  const { watch } = methods;

  const hasSomeProductOnCart = watch('selectedProducts').some(
    (product: ProductFormValues) => product.quantity > 0,
  );

  return (
    hasSomeProductOnCart && (
      <div className="flex flex-col items-center sticky bottom-0 z-50 p-4 bg-neutral-100 gap-4">
        <Typography variant="14-bold-700" className="text-primary">
          {t('MadeWithLoveInMaringa')}
        </Typography>
        <Button type="submit" className="w-full">
          {t('SeeTicket')}
        </Button>
      </div>
    )
  );
}

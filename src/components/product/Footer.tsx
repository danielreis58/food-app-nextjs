'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { Product, restaurants } from '../../constants/mock';
import { calculateCurrentPrice } from '../../lib/utils';
import { CartFormValues } from '../../validators/cart';
import { ProductFormValues } from '../../validators/products';
import Typography from '../Typography';
import { Button } from '../ui/Button';

export default function Footer() {
  const t = useTranslations('ProductFooter');
  const pathname = usePathname();
  const methods = useFormContext<CartFormValues>();

  const { watch } = methods;

  const restaurantId = watch('selectedRestaurantId');
  const selectedProducts = watch('selectedProducts');

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const hasSomeProductOnCart = watch('selectedProducts').some(
    (product: ProductFormValues) => product.quantity > 0,
  );

  if (!restaurant || !hasSomeProductOnCart) {
    return null;
  }

  const subtotal = selectedProducts.reduce((acc, product) => {
    let foundProduct: Product | null = null;
    let currentPrice: number | null = null;
    for (const category of restaurant.productCategories) {
      const productFind = category.products.find((p) => p.id === product.id);
      if (productFind) {
        foundProduct = productFind;
        break;
      }
    }

    if (foundProduct) {
      currentPrice = calculateCurrentPrice(foundProduct, product);
    }
    return acc + (currentPrice || 0);
  }, 0);

  return pathname === '/checkout' ? (
    <div className="flex items-center sticky bottom-0 z-50 px-8 py-4 bg-white gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="14-bold-700" className="text-neutral-900">
          {t('Subtotal')}
        </Typography>
        <Typography variant="20-extrabold-800" className="text-primary">
          {subtotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Typography>
      </div>
      <Button type="submit" className="w-full h-12">
        {t('GoToPayment')}
      </Button>
    </div>
  ) : (
    <div className="flex flex-col items-center sticky bottom-0 z-50 p-4 bg-neutral-100 gap-4">
      <Typography variant="14-bold-700" className="text-primary">
        {t('MadeWithLoveInMaringa')}
      </Typography>
      <Button type="submit" className="w-full">
        {t('SeeTicket')}
      </Button>
    </div>
  );
}

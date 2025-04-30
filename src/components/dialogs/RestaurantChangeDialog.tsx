'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/Dialog';
import { useParams, useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { Product, restaurants } from '../../constants/mock';
import { CartFormValues } from '../../validators/cart';
import { ProductFormValues } from '../../validators/products';

export default function RestaurantChangeDialog() {
  const params = useParams();
  const [open, setOpen] = useState(true);
  const t = useTranslations('Dialog');

  const router = useRouter();
  const methods = useFormContext<CartFormValues>();

  const { setValue } = methods;

  const handleConfirmRestaurantChange = () => {
    const restaurantId = params.restaurantId as string;
    const productId = params.productId as string;

    const foundRestaurant = restaurants.find((r) => r.id === restaurantId);
    if (foundRestaurant) {
      // Find product across all categories
      let foundProduct: Product | null = null;
      for (const category of foundRestaurant.productCategories) {
        const product = category.products.find((p) => p.id === productId);
        if (product) {
          foundProduct = product;
          break;
        }
      }

      if (foundProduct) {
        let defaultSize = foundProduct.sizeOptions?.items[0];
        // Set default size if available
        if (
          foundProduct.sizeOptions?.items &&
          foundProduct.sizeOptions?.items.length > 0
        ) {
          defaultSize = foundProduct.sizeOptions?.items.find(
            (s) => s.isDefault,
          );
        }
        const newProduct: ProductFormValues = {
          id: foundProduct.id,
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price,
          discountPrice: foundProduct.discountPrice,
          tags: foundProduct.tags,
          category: foundProduct.category,
          quantity: 0,
          selectedSizeId: defaultSize?.id,
          selectedAddonIds: [],
          selectedCutleryId: '',
          selectedExtraIds: [],
          notes: '',
        };

        const existingProduct = methods
          .getValues('selectedProducts')
          .find((p: ProductFormValues) => p.id === foundProduct.id);

        methods.setValue('selectedRestaurantId', foundRestaurant.id, {
          shouldValidate: true,
        });
        if (!existingProduct) {
          setValue('selectedProducts', [newProduct], {
            shouldValidate: true,
          });
        }
      }
    }

    setOpen(false);
  };

  const handleCancelRestaurantChange = () => {
    // Navigate back to previous restaurant
    router.push(`/checkout`);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogDescription>
          {t('ExistingItensFromAnotherRestaurant')}
        </AlertDialogDescription>
        <AlertDialogFooter className="gap-2">
          <AlertDialogAction onClick={handleCancelRestaurantChange}>
            {t('No')}
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleConfirmRestaurantChange}>
            {t('Yes')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

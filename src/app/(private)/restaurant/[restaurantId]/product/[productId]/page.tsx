'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import Addons from '@/components/product/Addons';
import CoverImage from '@/components/product/CoverImage';
import Cutlery from '@/components/product/Cutlery';
import Extras from '@/components/product/Extras';
import Header from '@/components/product/Header';
import Info from '@/components/product/Info';
import Notes from '@/components/product/Notes';
import Quantity from '@/components/product/Quantity';
import Sizes from '@/components/product/Sizes';
import { Restaurant, restaurants, type Product } from '@/constants/mock';
import { CartFormValues } from '@/validators/cart';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFormValues } from '../../../../../../validators/products';

export default function ProductDetailPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  const methods = useFormContext<CartFormValues>();

  const { setValue } = methods;

  const selectedProduct = methods
    .watch('selectedProducts')
    .find((p: ProductFormValues) => p.id === product?.id);

  const productIdx = methods
    .watch('selectedProducts')
    .findIndex((p: ProductFormValues) => p.id === product?.id);

  useEffect(() => {
    const restaurantId = params.restaurantId as string;
    const productId = params.productId as string;

    // Find restaurant and product
    const foundRestaurant = restaurants.find((r) => r.id === restaurantId);

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);

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
        setProduct(foundProduct);

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

        if (!existingProduct) {
          setValue(
            'selectedProducts',
            [...methods.getValues('selectedProducts'), newProduct],
            {
              shouldValidate: true,
            },
          );
        }
      }
    }

    setLoading(false);
  }, [params.restaurantId, params.productId, setValue]);

  if (loading) {
    return <Loading />;
  }

  if (!product || !restaurant || !selectedProduct) {
    return <NotFound />;
  }

  return (
    <div>
      <Header product={product} />

      <CoverImage product={product} />

      <div className="p-4 flex flex-col gap-4">
        <Info product={product} />

        <Quantity
          product={product}
          productIdx={productIdx}
          selectedProduct={selectedProduct}
        />

        <Sizes product={product} productIdx={productIdx} />

        <Addons product={product} productIdx={productIdx} />

        <Cutlery product={product} productIdx={productIdx} />

        <Extras product={product} productIdx={productIdx} />

        <Notes productIdx={productIdx} />
      </div>
    </div>
  );
}

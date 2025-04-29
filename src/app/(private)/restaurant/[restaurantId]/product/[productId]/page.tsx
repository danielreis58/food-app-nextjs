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
import { type ProductFormValues } from '@/validators/products';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductDetailPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  const methods = useFormContext<ProductFormValues>();

  const { setValue } = methods;

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

        // Set default size if available
        if (
          foundProduct.sizeOptions?.items &&
          foundProduct.sizeOptions?.items.length > 0
        ) {
          const defaultSize = foundProduct.sizeOptions?.items.find(
            (s) => s.isDefault,
          );
          setValue(
            'selectedSize',
            defaultSize?.id || foundProduct.sizeOptions?.items[0].id,
          );
        }
      }
    }

    setLoading(false);
  }, [params.restaurantId, params.productId, setValue]);

  if (loading) {
    return <Loading />;
  }

  if (!product || !restaurant) {
    return <NotFound />;
  }

  return (
    <div>
      <Header product={product} />

      <CoverImage product={product} />

      <div className="p-4 flex flex-col gap-4">
        <Info product={product} />

        <Quantity product={product} />

        <Sizes product={product} />

        <Addons product={product} />

        <Cutlery product={product} />

        <Extras product={product} />

        <Notes />
      </div>
    </div>
  );
}

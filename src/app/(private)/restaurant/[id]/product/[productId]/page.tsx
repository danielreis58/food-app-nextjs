'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import CheckboxOption from '@/components/product/CheckboxOption';
import CoverImage from '@/components/product/CoverImage';
import Header from '@/components/product/Header';
import Info from '@/components/product/Info';
import OptionHeader from '@/components/product/OptionHeader';
import RadioOption from '@/components/product/RadioOption';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/Button';
import { Restaurant, restaurants, type Product } from '@/constants/mock';
import { CircleMinus, CirclePlus, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Helper function to generate selection text
const getSelectionText = (
  min: number,
  max: number,
  isRequired: boolean,
): string => {
  if (!isRequired) return 'opcional';
  if (min === max && min === 1) return 'escolha 1';
  if (min === 1 && max > 1) return `escolha de ${min} a ${max}`;
  if (min === 0 && max === 1) return 'escolha até 1';
  return `escolha até ${max}`;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedCutlery, setSelectedCutlery] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const restaurantId = params.id as string;
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
          setSelectedSize(
            defaultSize?.id || foundProduct.sizeOptions?.items[0].id,
          );
        }
      }
    }

    setLoading(false);
  }, [params.id, params.productId]);

  if (loading) {
    return <Loading />;
  }

  if (!product || !restaurant) {
    return <NotFound />;
  }

  const { sizeOptions, addonOptions, cutleryOptions, extraOptions } = product;

  // Calculate current price based on selected options
  const calculateCurrentPrice = () => {
    let basePrice = product.discountPrice || product.price;

    // Add size price
    if (sizeOptions?.items && selectedSize) {
      const size = sizeOptions?.items.find((s) => s.id === selectedSize);
      if (size) {
        basePrice = product.discountPrice || product.price;
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

  const handleAddToCart = () => {
    // Here you would implement adding to cart functionality
    // For now, let's navigate to the checkout page
    router.push('/checkout');
  };

  // Toggle selected addon
  const handleToggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Toggle selected extra
  const handleToggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header product={product} />

      <CoverImage product={product} />

      <div className="p-4 flex flex-col gap-4">
        <Info product={product} />

        {/* Quantity Selector */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex flex-col gap-2">
            <Typography variant="16-bold-700" className="text-neutral-700">
              quantos?
            </Typography>
            <div className="flex items-center gap-1">
              <Typography variant="14-semi-600" className="text-neutral-500">
                total:
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
                onClick={() => setQuantity(1)}
              >
                adicionar
              </Button>
            ) : (
              <div className="flex items-center">
                <button
                  className="items-center justify-center text-teal-400 hover:text-teal-600 cursor-pointer"
                  onClick={() => quantity > 0 && setQuantity(quantity - 1)}
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
                  className="items-center justify-center text-teal-400 hover:text-teal-600 cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <CirclePlus className="size-8" strokeWidth={1} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sizes */}
        {sizeOptions && sizeOptions.items.length > 0 && (
          <div className="flex flex-col gap-6">
            <OptionHeader
              title={sizeOptions.title}
              subtitle={getSelectionText(
                sizeOptions.minSelect,
                sizeOptions.maxSelect,
                sizeOptions.required,
              )}
              required={sizeOptions.required}
            />
            <div className="flex flex-col gap-4">
              {sizeOptions.items.map((size) => (
                <RadioOption
                  key={size.id}
                  id={size.id}
                  name="size"
                  checked={selectedSize === size.id}
                  onChange={() => setSelectedSize(size.id)}
                  label={size.name}
                  price={size.price}
                  discountPrice={size.discountPrice}
                  showDiscount={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Addons */}
        {addonOptions && addonOptions.items.length > 0 && (
          <div className="flex flex-col gap-6">
            <OptionHeader
              title={addonOptions.title}
              subtitle={getSelectionText(
                addonOptions.minSelect,
                addonOptions.maxSelect,
                addonOptions.required,
              )}
              required={addonOptions.required}
            />
            <div className="flex flex-col gap-2">
              {addonOptions.items.map((addon) => (
                <CheckboxOption
                  key={addon.id}
                  id={addon.id}
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => handleToggleAddon(addon.id)}
                  label={addon.name}
                  price={addon.price}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cutlery */}
        {cutleryOptions && cutleryOptions.items.length > 0 && (
          <div className="flex flex-col gap-6">
            <OptionHeader
              title={cutleryOptions.title}
              subtitle={getSelectionText(
                cutleryOptions.minSelect,
                cutleryOptions.maxSelect,
                cutleryOptions.required,
              )}
              required={cutleryOptions.required}
            />
            <div className="flex flex-col gap-4">
              {cutleryOptions.items.map((cutlery) => (
                <RadioOption
                  key={cutlery.id}
                  id={cutlery.id}
                  name="cutlery"
                  checked={selectedCutlery === cutlery.id}
                  onChange={() => setSelectedCutlery(cutlery.id)}
                  label={cutlery.name}
                  price={cutlery.price}
                />
              ))}
            </div>
          </div>
        )}

        {/* Extras */}
        {extraOptions && extraOptions.items.length > 0 && (
          <div className="flex flex-col gap-6">
            <OptionHeader
              title={extraOptions.title}
              subtitle={getSelectionText(
                extraOptions.minSelect,
                extraOptions.maxSelect,
                extraOptions.required,
              )}
              required={extraOptions.required}
            />
            <div className="flex flex-col gap-4">
              {extraOptions.items.map((extra) => (
                <CheckboxOption
                  key={extra.id}
                  id={extra.id}
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => handleToggleExtra(extra.id)}
                  label={extra.name}
                  price={extra.price}
                />
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Typography variant="14-bold-700" className="text-neutral-700">
                alguma observação?
              </Typography>
              <Typography variant="12-bold-700" className="text-neutral-500">
                opcional
              </Typography>
            </div>
          </div>
          <textarea
            className="w-full border border-neutral-200 rounded p-2 text-sm"
            placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Add to cart button */}
      {quantity > 0 && (
        <div className="sticky bottom-0 z-50  p-4 bg-white border-t">
          <button
            className="w-full bg-primary text-white py-3 rounded-md font-bold"
            onClick={handleAddToCart}
          >
            ver ticket
          </button>
        </div>
      )}
    </div>
  );
}

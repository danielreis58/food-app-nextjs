'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import Typography from '@/components/Typography';
import { Restaurant, restaurants, type Product } from '@/constants/mock';
import {
  ChevronLeft,
  CircleDollarSign,
  CircleMinus,
  CirclePlus,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../../components/ui/Button';

import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';

type OptionHeaderProps = {
  title: string;
  subtitle?: string;
  required?: boolean;
};

const OptionHeader: React.FC<OptionHeaderProps> = ({
  title,
  subtitle,
  required,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Typography variant="14-bold-700" className="text-neutral-700">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="12-bold-700" className="text-neutral-500">
            {subtitle}
          </Typography>
        )}
      </div>
      {required && (
        <div className="p-2 bg-neutral-700 rounded text-center">
          <Typography variant="12-bold-700" className="text-white">
            obrigatório
          </Typography>
        </div>
      )}
    </div>
  );
};

// Reusable radio option component
type RadioOptionProps = {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  price?: number;
  discountPrice?: number;
  showDiscount?: boolean;
};

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  price = 0,
  discountPrice = 0,
  showDiscount = false,
}) => {
  return (
    <div className="flex items-center" onClick={onChange}>
      <RadioGroup
        className="w-full"
        value={checked ? id : ''}
        onValueChange={() => onChange()}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value={id} id={id} />
          <label
            htmlFor={id}
            className="flex-1 flex justify-between cursor-pointer w-full"
          >
            <div className="flex items-center gap-1">
              {showDiscount && discountPrice > 0 && (
                <CircleDollarSign className="size-4 text-green-500" />
              )}
              <Typography variant="14-regular-400" className="text-neutral-500">
                {label}
              </Typography>
            </div>
            {discountPrice > 0 ? (
              <div className="flex items-center gap-1">
                <Typography variant="12-bold-700" className="text-neutral-500">
                  de R$ {price.toFixed(2)} por
                </Typography>
                <Typography variant="14-bold-700" className="text-green-600">
                  R$ {discountPrice.toFixed(2)}
                </Typography>
              </div>
            ) : price > 0 ? (
              <Typography variant="14-bold-700" className="text-primary">
                {name !== 'size' ? '+ ' : ''}R$ {price.toFixed(2)}
              </Typography>
            ) : null}
          </label>
        </div>
      </RadioGroup>
    </div>
  );
};

// Reusable checkbox option component
type CheckboxOptionProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  price?: number;
};

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  id,
  checked,
  onChange,
  label,
  price = 0,
}) => {
  return (
    <div className="flex items-center" onClick={onChange}>
      <div className="flex items-center gap-3 w-full">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={() => onChange()}
        />
        <label
          htmlFor={id}
          className="flex-1 flex justify-between cursor-pointer"
        >
          <Typography variant="14-regular-400" className="text-neutral-500">
            {label}
          </Typography>
          {price > 0 && (
            <Typography variant="14-bold-700" className="text-primary">
              +R$ {price.toFixed(2)}
            </Typography>
          )}
        </label>
      </div>
    </div>
  );
};

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
      {/* Header with back button */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="size-5 text-neutral-800" />
        </button>
        <Typography variant="16-bold-700">{product.name}</Typography>
      </div>

      {/* Product Image */}
      {product.image && (
        <div className="w-full h-48 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-4">
        {/* Product Info */}
        <div>
          <Typography variant="20-bold-700" className="mb-2">
            {product.name}
          </Typography>

          <div className="flex items-center gap-2 mb-2">
            {sizeOptions?.items && (
              <Typography variant="14-bold-800" className="text-neutral-500">
                a partir de
              </Typography>
            )}
            <Typography variant="18-extrabold-800" className="text-primary">
              {`R$ ${(product.discountPrice || product.price).toFixed(2)}`}
            </Typography>
          </div>
          <Typography variant="14-regular-400" className="text-neutral-500">
            {product.description}
          </Typography>
        </div>

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

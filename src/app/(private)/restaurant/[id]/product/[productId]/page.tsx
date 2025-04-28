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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
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
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          const defaultSize = foundProduct.sizes.find((s) => s.isDefault);
          setSelectedSize(defaultSize?.id || foundProduct.sizes[0].id);
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

  // Calculate current price based on selected options
  const calculateCurrentPrice = () => {
    let basePrice = product.discountPrice || product.price;

    // Add size price
    if (product.sizes && selectedSize) {
      const size = product.sizes.find((s) => s.id === selectedSize);
      if (size) {
        basePrice = product.discountPrice || product.price;
      }
    }

    // Add extras price
    if (product.extras && selectedExtras.length > 0) {
      for (const extraId of selectedExtras) {
        const extra = product.extras.find((e) => e.id === extraId);
        if (extra) {
          basePrice += extra.price;
        }
      }
    }

    // Add cutlery price
    if (product.cutlery && selectedCutlery) {
      const cutlery = product.cutlery.find((c) => c.id === selectedCutlery);
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
            {product.sizes && (
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
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Typography variant="14-bold-700" className="text-neutral-700">
                  qual o tamanho?
                </Typography>
                <Typography variant="12-bold-700" className="text-neutral-500">
                  escolha 1
                </Typography>
              </div>
              <div className="p-2 bg-neutral-700 rounded text-center">
                <Typography variant="12-bold-700" className="text-white">
                  obrigatório
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {product.sizes.map((size) => (
                <div
                  key={size.id}
                  className="flex items-center"
                  onClick={() => setSelectedSize(size.id)}
                >
                  <input
                    type="radio"
                    id={size.id}
                    name="size"
                    checked={selectedSize === size.id}
                    onChange={() => {}}
                    className="mr-2 accent-primary"
                  />
                  <label
                    htmlFor={size.id}
                    className="flex-1 flex justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      {!!size.discountPrice && (
                        <CircleDollarSign className="size-4 text-green-500" />
                      )}
                      <Typography
                        variant="14-regular-400"
                        className="text-neutral-500"
                      >
                        {size.name}
                      </Typography>
                    </div>
                    {size.discountPrice ? (
                      <div className="flex items-center gap-1">
                        <Typography
                          variant="12-bold-700"
                          className="text-neutral-500"
                        >
                          de R$ {size.price.toFixed(2)} por
                        </Typography>
                        <Typography
                          variant="14-bold-700"
                          className="text-green-600"
                        >
                          R$ {size.discountPrice.toFixed(2)}
                        </Typography>
                      </div>
                    ) : (
                      <Typography
                        variant="14-bold-700"
                        className="text-primary"
                      >
                        R$ ${size.price.toFixed(2)}
                      </Typography>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addons */}
        {product.addons && product.addons.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Typography variant="14-bold-700" className="text-neutral-700">
                  acompanhamentos
                </Typography>
                <Typography variant="12-bold-700" className="text-neutral-500">
                  escolha de 1 a 2
                </Typography>
              </div>
              <div className="p-2 bg-neutral-700 rounded text-center">
                <Typography variant="12-bold-700" className="text-white">
                  obrigatório
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {product.addons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center"
                  onClick={() => handleToggleAddon(addon.id)}
                >
                  <input
                    type="checkbox"
                    id={addon.id}
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => {}}
                    className="mr-2 accent-primary"
                  />
                  <label
                    htmlFor={addon.id}
                    className="flex-1 flex justify-between cursor-pointer"
                  >
                    <Typography
                      variant="14-regular-400"
                      className="text-neutral-700"
                    >
                      {addon.name}
                    </Typography>
                    {addon.price > 0 && (
                      <Typography
                        variant="14-bold-700"
                        className="text-primary"
                      >
                        +R$ {addon.price.toFixed(2)}
                      </Typography>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cutlery */}
        {product.cutlery && product.cutlery.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Typography variant="14-bold-700" className="text-neutral-700">
                  precisa de talher?
                </Typography>
                <Typography variant="12-bold-700" className="text-neutral-500">
                  escolha 1
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {product.cutlery.map((cutlery) => (
                <div
                  key={cutlery.id}
                  className="flex items-center"
                  onClick={() => setSelectedCutlery(cutlery.id)}
                >
                  <input
                    type="radio"
                    id={cutlery.id}
                    name="cutlery"
                    checked={selectedCutlery === cutlery.id}
                    onChange={() => {}}
                    className="mr-2 accent-primary"
                  />
                  <label
                    htmlFor={cutlery.id}
                    className="flex-1 flex justify-between cursor-pointer"
                  >
                    <Typography
                      variant="14-regular-400"
                      className="text-neutral-700"
                    >
                      {cutlery.name}
                    </Typography>
                    {cutlery.price > 0 && (
                      <Typography
                        variant="14-bold-700"
                        className="text-primary"
                      >
                        +R$ {cutlery.price.toFixed(2)}
                      </Typography>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extras */}
        {product.extras && product.extras.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Typography variant="14-bold-700" className="text-neutral-700">
                  mais alguma coisa?
                </Typography>
                <Typography variant="12-bold-700" className="text-neutral-500">
                  escolha até 2
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {product.extras.map((extra) => (
                <div
                  key={extra.id}
                  className="flex items-center"
                  onClick={() => handleToggleExtra(extra.id)}
                >
                  <input
                    type="checkbox"
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => {}}
                    className="mr-2 accent-primary"
                  />
                  <label
                    htmlFor={extra.id}
                    className="flex-1 flex justify-between cursor-pointer"
                  >
                    <Typography
                      variant="14-regular-400"
                      className="text-neutral-700"
                    >
                      {extra.name}
                    </Typography>
                    <Typography variant="14-bold-700" className="text-primary">
                      +R$ {extra.price.toFixed(2)}
                    </Typography>
                  </label>
                </div>
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
      <div className="p-4 bg-white border-t">
        <button
          className="w-full bg-primary text-white py-3 rounded-md font-bold"
          onClick={handleAddToCart}
        >
          ver ticket
        </button>
      </div>
    </div>
  );
}

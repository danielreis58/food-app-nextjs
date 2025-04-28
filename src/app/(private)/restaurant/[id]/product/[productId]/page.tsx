'use client';

import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import Typography from '@/components/Typography';
import { restaurants, type Product } from '@/constants/mock';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
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
    let basePrice = product.price;

    // Add size price
    if (product.sizes && selectedSize) {
      const size = product.sizes.find((s) => s.id === selectedSize);
      if (size) {
        basePrice = size.price;
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="p-4 flex flex-col gap-4">
        {/* Product Info */}
        <div>
          <Typography variant="20-bold-700" className="mb-2">
            {product.name}
          </Typography>
          <Typography variant="14-regular-400" className="text-neutral-600">
            {product.description}
          </Typography>
          <Typography variant="16-bold-700" className="text-primary mt-2">
            {product.sizes
              ? `a partir de R$ ${product.price.toFixed(2)}`
              : `R$ ${product.price.toFixed(2)}`}
          </Typography>
        </div>

        {/* Quantity Selector */}
        <div>
          <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
            quantos?
          </Typography>
          <div className="flex items-center">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <span className="text-neutral-500 text-xl">-</span>
            </button>
            <Typography variant="16-bold-700" className="mx-4">
              {quantity}
            </Typography>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 text-primary"
              onClick={() => setQuantity(quantity + 1)}
            >
              <span className="text-xl">+</span>
            </button>
            <Typography variant="16-bold-700" className="ml-4 text-primary">
              total: R$ {calculateCurrentPrice().toFixed(2)}
            </Typography>
          </div>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              qual o tamanho?
            </Typography>
            <div className="flex flex-col gap-2">
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
                    <Typography
                      variant="14-regular-400"
                      className="text-neutral-700"
                    >
                      {size.name}
                    </Typography>
                    <Typography variant="14-bold-700" className="text-primary">
                      {size.isDefault
                        ? `de R$ ${(size.price + 3).toFixed(2)} por R$ ${size.price.toFixed(2)}`
                        : `R$ ${size.price.toFixed(2)}`}
                    </Typography>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-2 px-2 py-1 bg-neutral-100 rounded text-center">
              <Typography variant="12-bold-700" className="text-neutral-500">
                obrigatório
              </Typography>
            </div>
          </div>
        )}

        {/* Addons */}
        {product.addons && product.addons.length > 0 && (
          <div>
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              acompanhamentos
            </Typography>
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
            <div className="mt-2 px-2 py-1 bg-neutral-100 rounded text-center">
              <Typography variant="12-bold-700" className="text-neutral-500">
                obrigatório escolha de 1 a {product.addons.length}
              </Typography>
            </div>
          </div>
        )}

        {/* Cutlery */}
        {product.cutlery && product.cutlery.length > 0 && (
          <div>
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              precisa de talher?
            </Typography>
            <div className="flex flex-col gap-2">
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
            <div className="mt-2 px-2 py-1 bg-neutral-100 rounded text-center">
              <Typography variant="12-bold-700" className="text-neutral-500">
                escolha até 1
              </Typography>
            </div>
          </div>
        )}

        {/* Extras */}
        {product.extras && product.extras.length > 0 && (
          <div>
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              mais alguma coisa?
            </Typography>
            <div className="flex flex-col gap-2">
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
            <div className="mt-2 px-2 py-1 bg-neutral-100 rounded text-center">
              <Typography variant="12-bold-700" className="text-neutral-500">
                escolha até 2
              </Typography>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
            alguma observação do item? • opcional
          </Typography>
          <textarea
            className="w-full border border-neutral-200 rounded p-2 text-sm"
            placeholder="ex: tirar algum ingrediente, ponto do prato"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Add to cart button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          className="w-full bg-primary text-white py-3 rounded-md font-bold"
          onClick={handleAddToCart}
        >
          adicionar
        </button>
      </div>
    </div>
  );
}

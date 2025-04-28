'use client';

import Typography from '@/components/Typography';
import { type Product } from '@/constants/mock';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.find((s) => s.isDefault)?.id || product.sizes?.[0]?.id,
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedCutlery, setSelectedCutlery] = useState<string>();
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Encontra o preço do tamanho selecionado ou usa o preço padrão do produto
  const currentPrice =
    product.sizes?.find((s) => s.id === selectedSize)?.price || product.price;

  // Calcula o preço adicional de extras selecionados
  const calculateExtrasPrice = () => {
    let extrasPrice = 0;

    if (product.extras && selectedExtras.length > 0) {
      product.extras.forEach((extra) => {
        if (selectedExtras.includes(extra.id)) {
          extrasPrice += extra.price;
        }
      });
    }

    return extrasPrice;
  };

  // Calcula o preço adicional do talher selecionado
  const calculateCutleryPrice = () => {
    if (!selectedCutlery || !product.cutlery) return 0;

    const cutlery = product.cutlery.find((c) => c.id === selectedCutlery);
    return cutlery ? cutlery.price : 0;
  };

  // Calcula o preço total
  const totalPrice =
    (currentPrice + calculateExtrasPrice() + calculateCutleryPrice()) *
    quantity;

  const handleToggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleToggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <Typography variant="16-bold-700" className="text-neutral-800">
            {product.name}
          </Typography>
          <Typography
            variant="14-regular-400"
            className="text-neutral-500 mt-1"
          >
            {product.description}
          </Typography>
          <Typography variant="16-bold-700" className="text-primary mt-2">
            {product.sizes
              ? `a partir de R$ ${product.price.toFixed(2)}`
              : `R$ ${product.price.toFixed(2)}`}
          </Typography>
        </div>

        {product.image && (
          <div className="w-20 h-20 relative rounded-lg overflow-hidden ml-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        )}
      </div>

      {expanded && (
        <div className="mt-4 border-t pt-4">
          {/* Quantidade */}
          <div className="mb-4">
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              quantos?
            </Typography>
            <div className="flex items-center">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200"
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              >
                <span className="text-neutral-500">-</span>
              </button>
              <Typography variant="16-bold-700" className="mx-4">
                {quantity}
              </Typography>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
              >
                <span>+</span>
              </button>
              <Typography variant="16-bold-700" className="ml-4 text-primary">
                total: R$ {totalPrice.toFixed(2)}
              </Typography>
            </div>
          </div>

          {/* Tamanhos */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <Typography
                variant="14-bold-700"
                className="text-neutral-700 mb-2"
              >
                qual o tamanho?
              </Typography>
              <div className="flex flex-col gap-2">
                {product.sizes.map((size) => (
                  <div
                    key={size.id}
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size.id);
                    }}
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
                      <Typography
                        variant="14-bold-700"
                        className="text-primary"
                      >
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

          {/* Acompanhamentos */}
          {product.addons && product.addons.length > 0 && (
            <div className="mb-4">
              <Typography
                variant="14-bold-700"
                className="text-neutral-700 mb-2"
              >
                acompanhamentos
              </Typography>
              <div className="flex flex-col gap-2">
                {product.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleAddon(addon.id);
                    }}
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

          {/* Talheres */}
          {product.cutlery && product.cutlery.length > 0 && (
            <div className="mb-4">
              <Typography
                variant="14-bold-700"
                className="text-neutral-700 mb-2"
              >
                precisa de talher?
              </Typography>
              <div className="flex flex-col gap-2">
                {product.cutlery.map((cutlery) => (
                  <div
                    key={cutlery.id}
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCutlery(cutlery.id);
                    }}
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
            <div className="mb-4">
              <Typography
                variant="14-bold-700"
                className="text-neutral-700 mb-2"
              >
                mais alguma coisa?
              </Typography>
              <div className="flex flex-col gap-2">
                {product.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleExtra(extra.id);
                    }}
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
                      <Typography
                        variant="14-bold-700"
                        className="text-primary"
                      >
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

          {/* Observação */}
          <div className="mb-4">
            <Typography variant="14-bold-700" className="text-neutral-700 mb-2">
              alguma observação do item? • opcional
            </Typography>
            <textarea
              className="w-full border border-neutral-200 rounded p-2 text-sm"
              placeholder="ex: tirar algum ingrediente, ponto do prato"
              rows={3}
              onClick={(e) => e.stopPropagation()}
            ></textarea>
          </div>

          {/* Botão adicionar */}
          <div className="mt-2 flex justify-end">
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Aqui implementaria a lógica para adicionar ao carrinho
                alert(`Produto ${product.name} adicionado ao carrinho!`);
              }}
            >
              adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

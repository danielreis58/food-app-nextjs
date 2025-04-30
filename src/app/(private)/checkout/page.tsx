'use client';

import Header from '@/components/checkout/Header';
import NotFound from '@/components/NotFound';
import { restaurants } from '@/constants/mock';
import { calculateCurrentPrice } from '@/lib/utils';
import { CartFormValues } from '@/validators/cart';
import { Edit2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import QuantityControl from '../../../components/QuantityControl';
import Typography from '../../../components/Typography';

export default function CheckoutPage() {
  const router = useRouter();
  const t = useTranslations();
  const methods = useFormContext<CartFormValues>();

  const restaurantId = methods.watch('selectedRestaurantId');
  const selectedProducts = methods.watch('selectedProducts');

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <Header restaurant={restaurant} />
      <div className="flex-1 flex-col">
        {selectedProducts
          .filter((selectedProduct) => selectedProduct.quantity > 0)
          .map((selectedProduct, index) => {
            const product = restaurant.productCategories
              .flatMap((category) => category.products)
              .find((p) => p.id === selectedProduct.id);

            if (!product) {
              return null;
            }

            const { sizeOptions, addonOptions, cutleryOptions, extraOptions } =
              product;

            const selectedSize = sizeOptions?.items.find(
              (s) => s.id === selectedProduct.selectedSizeId,
            );

            return (
              <div
                key={index}
                className="flex flex-col bg-white p-4 gap-2 mb-1"
              >
                <div className="flex items-center justify-between">
                  <Typography
                    variant="14-bold-700"
                    className="text-neutral-700"
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="14-bold-700" className="text-primary">
                    {calculateCurrentPrice(
                      product,
                      selectedProduct,
                    ).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Typography>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className="flex flex-1 items-center justify-end gap-1 cursor-pointer text-teal-400 hover:text-teal-600"
                    onClick={() => {
                      router.push(
                        `/restaurant/${restaurantId}/product/${product.id}`,
                      );
                    }}
                  >
                    <Edit2 />
                    <Typography variant="14-bold-700">
                      {t('Common.Edit')}
                    </Typography>
                  </div>
                  <QuantityControl
                    productIdx={index}
                    selectedProduct={selectedProduct}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {selectedProduct.selectedSizeId && (
                    <div className="flex flex-col gap-2">
                      <Typography
                        variant="12-bold-700"
                        className="text-neutral-500"
                      >
                        • {sizeOptions?.title}
                      </Typography>
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="12-semi-600"
                          className="text-neutral-500"
                        >
                          {selectedSize?.name}
                        </Typography>
                        <Typography
                          variant="12-semi-600"
                          className="text-neutral-500"
                        >
                          {(
                            selectedSize?.discountPrice || selectedSize?.price
                          )?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {selectedProduct?.selectedAddonIds &&
                    selectedProduct?.selectedAddonIds?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <Typography
                          variant="12-bold-700"
                          className="text-neutral-500"
                        >
                          • {addonOptions?.title}
                        </Typography>
                        {addonOptions?.items
                          .filter((s) =>
                            selectedProduct?.selectedAddonIds?.includes(s.id),
                          )
                          .map((s, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <Typography
                                key={s.id}
                                variant="12-semi-600"
                                className="text-neutral-500"
                              >
                                {s.name}
                              </Typography>
                              <Typography
                                variant="12-semi-600"
                                className="text-neutral-500"
                              >
                                {(s.discountPrice || s.price)?.toLocaleString(
                                  'pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                  },
                                )}
                              </Typography>
                            </div>
                          ))}
                      </div>
                    )}
                  {selectedProduct.selectedCutleryId && (
                    <div className="flex flex-col gap-2">
                      <Typography
                        variant="12-bold-700"
                        className="text-neutral-500"
                      >
                        • {cutleryOptions?.title}
                      </Typography>
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="12-semi-600"
                          className="text-neutral-500"
                        >
                          {
                            cutleryOptions?.items.find(
                              (s) => s.id === selectedProduct.selectedCutleryId,
                            )?.name
                          }
                        </Typography>
                        <Typography
                          variant="12-semi-600"
                          className="text-neutral-500"
                        >
                          {(
                            cutleryOptions?.items.find(
                              (s) => s.id === selectedProduct.selectedCutleryId,
                            )?.discountPrice ||
                            cutleryOptions?.items.find(
                              (s) => s.id === selectedProduct.selectedCutleryId,
                            )?.price
                          )?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {selectedProduct?.selectedExtraIds &&
                    selectedProduct?.selectedExtraIds?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <Typography
                          variant="12-bold-700"
                          className="text-neutral-500"
                        >
                          • {extraOptions?.title}
                        </Typography>
                        {extraOptions?.items
                          .filter((s) =>
                            selectedProduct?.selectedExtraIds?.includes(s.id),
                          )
                          .map((s, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <Typography
                                key={s.id}
                                variant="12-semi-600"
                                className="text-neutral-500"
                              >
                                {s.name}
                              </Typography>
                              <Typography
                                variant="12-semi-600"
                                className="text-neutral-500"
                              >
                                {(s.discountPrice || s.price)?.toLocaleString(
                                  'pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                  },
                                )}
                              </Typography>
                            </div>
                          ))}
                      </div>
                    )}

                  {selectedProduct.notes && (
                    <div className="flex flex-col gap-2">
                      <Typography
                        variant="12-bold-700"
                        className="text-neutral-500"
                      >
                        • {t('Note.SomeNote')}
                      </Typography>
                      <Typography
                        variant="12-semi-600"
                        className="text-neutral-500 bg-neutral-50 p-1"
                      >
                        {selectedProduct.notes}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

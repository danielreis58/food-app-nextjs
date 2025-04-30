'use client';

import OptionHeader from '@/components/product/OptionHeader';
import RadioOption from '@/components/product/RadioOption';
import { type Product } from '@/constants/mock';
import { getSelectionText } from '@/lib/utils';

type SizesProps = {
  product: Product;
  productIdx: number;
};

export default function Sizes({ product, productIdx }: SizesProps) {
  const { sizeOptions } = product;

  return (
    sizeOptions &&
    sizeOptions.items.length > 0 && (
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
              fieldName={`selectedProducts.${productIdx}.selectedSizeId`}
              label={size.name}
              price={size.price}
              discountPrice={size.discountPrice}
              showDiscount={true}
            />
          ))}
        </div>
      </div>
    )
  );
}

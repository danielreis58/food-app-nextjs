'use client';

import CheckboxOption from '@/components/product/CheckboxOption';
import OptionHeader from '@/components/product/OptionHeader';
import { type Product } from '@/constants/mock';
import { getSelectionText } from '../../lib/utils';

type ExtrasProps = {
  product: Product;
};

export default function Extras({ product }: ExtrasProps) {
  const { extraOptions } = product;

  return (
    extraOptions &&
    extraOptions.items.length > 0 && (
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
              fieldName="selectedExtras"
              label={extra.name}
              price={extra.price}
            />
          ))}
        </div>
      </div>
    )
  );
}

'use client';

import CheckboxOption from '@/components/product/CheckboxOption';
import OptionHeader from '@/components/product/OptionHeader';
import { type Product } from '@/constants/mock';
import { getSelectionText } from '../../lib/utils';

type AddonsProps = {
  product: Product;
};

export default function Addons({ product }: AddonsProps) {
  const { addonOptions } = product;

  return (
    addonOptions &&
    addonOptions.items.length > 0 && (
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
              fieldName="selectedAddons"
              label={addon.name}
              price={addon.price}
            />
          ))}
        </div>
      </div>
    )
  );
}

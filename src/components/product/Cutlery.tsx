'use client';

import OptionHeader from '@/components/product/OptionHeader';
import RadioOption from '@/components/product/RadioOption';
import { type Product } from '@/constants/mock';
import { getSelectionText } from '../../lib/utils';

type CutleryProps = {
  product: Product;
};

export default function Cutlery({ product }: CutleryProps) {
  const { cutleryOptions } = product;

  return (
    cutleryOptions &&
    cutleryOptions.items.length > 0 && (
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
              fieldName="selectedCutlery"
              label={cutlery.name}
              price={cutlery.price}
            />
          ))}
        </div>
      </div>
    )
  );
}

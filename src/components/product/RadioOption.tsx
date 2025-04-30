'use client';

import Typography from '@/components/Typography';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { CircleDollarSign } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { CartFormValues } from '../../validators/cart';

type RadioOptionProps = {
  id: string;
  name: string;
  fieldName:
    | `selectedProducts.${number}.selectedSizeId`
    | `selectedProducts.${number}.selectedCutleryId`
    | `selectedProducts.${number}.selectedExtraIds`;
  label: string;
  price?: number;
  discountPrice?: number;
  showDiscount?: boolean;
};

export default function RadioOption({
  id,
  name,
  fieldName,
  label,
  price = 0,
  discountPrice = 0,
  showDiscount = false,
}: RadioOptionProps) {
  const { control } = useFormContext<CartFormValues>();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <div className="flex items-center">
          <RadioGroup
            className="w-full"
            value={field.value === id ? id : ''}
            onValueChange={(value) => {
              if (value) {
                field.onChange(id);
              }
            }}
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
                  <Typography
                    variant="14-regular-400"
                    className="text-neutral-500"
                  >
                    {label}
                  </Typography>
                </div>
                {discountPrice > 0 ? (
                  <div className="flex items-center gap-1">
                    <Typography
                      variant="12-bold-700"
                      className="text-neutral-500"
                    >
                      de R$ {price.toFixed(2)} por
                    </Typography>
                    <Typography
                      variant="14-bold-700"
                      className="text-green-600"
                    >
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
      )}
    />
  );
}

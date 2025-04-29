'use client';

import Typography from '@/components/Typography';
import { Checkbox } from '@/components/ui/Checkbox';
import { Controller, useFormContext } from 'react-hook-form';

type CheckboxOptionProps = {
  id: string;
  fieldName: string;
  label: string;
  price?: number;
};

export default function CheckboxOption({
  id,
  fieldName,
  label,
  price = 0,
}: CheckboxOptionProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => {
        const values = field.value || [];
        const checked = Array.isArray(values) && values.includes(id);

        const handleChange = (checked: boolean) => {
          const newValues = checked
            ? [...values, id]
            : values.filter((value: string) => value !== id);
          field.onChange(newValues);
        };

        return (
          <div className="flex items-center">
            <div className="flex items-center gap-3 w-full">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={handleChange}
              />
              <label
                htmlFor={id}
                className="flex-1 flex justify-between cursor-pointer"
              >
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-500"
                >
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
      }}
    />
  );
}

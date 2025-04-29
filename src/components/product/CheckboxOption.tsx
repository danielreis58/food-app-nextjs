'use client';

import Typography from '@/components/Typography';
import { Checkbox } from '@/components/ui/Checkbox';

type CheckboxOptionProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  price?: number;
};

export default function CheckboxOption({
  id,
  checked,
  onChange,
  label,
  price = 0,
}: CheckboxOptionProps) {
  return (
    <div className="flex items-center" onClick={onChange}>
      <div className="flex items-center gap-3 w-full">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={() => onChange()}
        />
        <label
          htmlFor={id}
          className="flex-1 flex justify-between cursor-pointer"
        >
          <Typography variant="14-regular-400" className="text-neutral-500">
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
}

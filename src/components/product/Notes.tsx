'use client';

import Typography from '@/components/Typography';
import { type ProductFormValues } from '@/validators/products';
import { useFormContext } from 'react-hook-form';

export default function Notes() {
  const methods = useFormContext<ProductFormValues>();

  const { watch, setValue } = methods;

  const notes = watch('notes');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Typography variant="14-bold-700" className="text-neutral-700">
            alguma observação?
          </Typography>
          <Typography variant="12-bold-700" className="text-neutral-500">
            opcional
          </Typography>
        </div>
      </div>
      <textarea
        className="w-full border border-neutral-200 rounded p-2 text-sm"
        placeholder="alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato"
        rows={3}
        value={notes}
        onChange={(e) => setValue('notes', e.target.value)}
      ></textarea>
    </div>
  );
}

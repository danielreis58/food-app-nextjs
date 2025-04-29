'use client';

import { useFormContext } from 'react-hook-form';
import { ProductFormValues } from '../../validators/products';

export default function Footer() {
  const methods = useFormContext<ProductFormValues>();

  const { watch } = methods;

  const quantity = watch('quantity');

  return (
    quantity > 0 && (
      <div className="sticky bottom-0 z-50 p-4 bg-white border-t">
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md font-bold"
        >
          ver ticket
        </button>
      </div>
    )
  );
}

'use client';

import Typography from '@/components/Typography';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CartFormValues } from '../../validators/cart';

type NotesProps = {
  productIdx: number;
};
export default function Notes({ productIdx }: NotesProps) {
  const t = useTranslations();
  const methods = useFormContext<CartFormValues>();

  const { watch, setValue } = methods;

  const notes = watch(`selectedProducts.${productIdx}.notes`);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Typography variant="14-bold-700" className="text-neutral-700">
            {t('Note.SomeNote')}
          </Typography>
          <Typography variant="12-bold-700" className="text-neutral-500">
            {t('Common.Optional')}
          </Typography>
        </div>
      </div>
      <textarea
        className="w-full border border-neutral-200 rounded p-2 text-sm"
        placeholder={t('Note.NotePlaceholder')}
        rows={3}
        value={notes}
        onChange={(e) =>
          setValue(`selectedProducts.${productIdx}.notes`, e.target.value, {
            shouldValidate: true,
          })
        }
      ></textarea>
    </div>
  );
}

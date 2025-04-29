'use client';

import Typography from '@/components/Typography';
import { useTranslations } from 'next-intl';

type OptionHeaderProps = {
  title: string;
  subtitle?: string;
  required?: boolean;
};

export default function OptionHeader({
  title,
  subtitle,
  required,
}: OptionHeaderProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Typography variant="14-bold-700" className="text-neutral-700">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="12-bold-700" className="text-neutral-500">
            {subtitle}
          </Typography>
        )}
      </div>
      {required && (
        <div className="p-2 bg-neutral-700 rounded text-center">
          <Typography variant="12-bold-700" className="text-white">
            {t('Common.Required')}
          </Typography>
        </div>
      )}
    </div>
  );
}

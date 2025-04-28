'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Typography from './Typography';
import { Button } from './ui/Button';

const NotFound = () => {
  const t = useTranslations('NotFound');

  const router = useRouter();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center gap-4">
      <Typography variant="16-bold-700" className="text-gray-400">
        {t('NotFound')}
      </Typography>
      <Button className="w-full" onClick={() => router.push('/')}>
        {t('BackToHome')}
      </Button>
    </div>
  );
};

export default NotFound;

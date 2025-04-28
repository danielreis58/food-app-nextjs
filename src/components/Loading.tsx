'use client';

import { useTranslations } from 'next-intl';
import Typography from './Typography';

const Loading = () => {
  const t = useTranslations('Loading');

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <Typography variant="16-bold-700" className="text-gray-400">
        {t('Loading')}
      </Typography>
    </div>
  );
};

export default Loading;

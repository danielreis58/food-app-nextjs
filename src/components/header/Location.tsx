import Typography from '@/components/Typography';
import { ADDRESS } from '@/constants/mock';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Location() {
  const t = useTranslations('Location');

  return (
    <div className="flex flex-1 items-center justify-center gap-3">
      <div>
        <MapPin className="size-4 text-white" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <Typography variant="14-bold-700" className="text-purple-200">
          {t('DeliveringIn')}
        </Typography>
        <Typography variant="16-bold-700" className="text-white">
          {ADDRESS}
        </Typography>
      </div>
    </div>
  );
}

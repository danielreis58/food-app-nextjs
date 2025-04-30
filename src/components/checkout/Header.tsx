'use client';

import Typography from '@/components/Typography';
import { type Restaurant } from '@/constants/mock';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  restaurant: Restaurant;
};
export default function Header({ restaurant }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center p-4 border-b bg-white">
      <button onClick={() => router.back()} className="mr-2 cursor-pointer">
        <ChevronLeft className="size-5 text-neutral-800" />
      </button>
      {/* Logo and name */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 relative rounded-md overflow-hidden">
          <Image
            src={restaurant.logo}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="14-bold-700" className="text-neutral-500">
            seus itens em
          </Typography>
          <Typography variant="16-bold-700" className="text-neutral-900">
            {restaurant.name}
          </Typography>
        </div>
      </div>
    </div>
  );
}

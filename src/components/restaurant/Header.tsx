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
    <div className="flex items-center p-4 border-b">
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
        <Typography variant="20-extrabold-800" className="text-neutral-900">
          {restaurant.name}
        </Typography>
      </div>
    </div>
  );
}

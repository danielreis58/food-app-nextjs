'use client';

import Typography from '@/components/Typography';
import { type Product } from '@/constants/mock';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  product: Product;
};
export default function Header({ product }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center p-4 border-b">
      <button onClick={() => router.back()} className="mr-2 cursor-pointer">
        <ChevronLeft className="size-5 text-neutral-800" />
      </button>
      <Typography variant="16-bold-700">{product.name}</Typography>
    </div>
  );
}

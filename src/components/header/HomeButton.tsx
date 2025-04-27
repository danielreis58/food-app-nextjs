'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

export default function HomeButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="border-0 text-white hover:bg-[var(--color-primary)]"
      onClick={() => router.push('/')}
      mode="icon"
    >
      <Image src="/svg/logo.svg" alt="Logo" width={32} height={32} />
    </Button>
  );
}

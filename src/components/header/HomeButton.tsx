'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

export default function HomeButton() {
  return (
    <Link href="/">
      <Button
        variant="outline"
        className="border-0 text-white hover:bg-[var(--color-primary)]"
        mode="icon"
      >
        <Image src="/svg/logo.svg" alt="Logo" width={32} height={32} />
      </Button>
    </Link>
  );
}

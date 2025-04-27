'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/Button';

export default function UserButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Remove the fake token cookie
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/sign-in');
  };
  return (
    <Button
      variant="outline"
      size="xs"
      className="border-0 text-white hover:bg-[var(--color-primary)] !p-2 !w-auto !h-auto"
      onClick={handleLogout}
      disabled={isLoading}
      mode="icon"
    >
      <User className="!size-6" />
    </Button>
  );
}

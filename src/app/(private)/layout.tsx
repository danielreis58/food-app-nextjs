'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className="min-h-screen">
      <header className="shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Food App</h1>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-secondary)] transition-colors duration-200 disabled:opacity-70"
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
}

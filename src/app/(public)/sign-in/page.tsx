'use client';

import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Set a fake token cookie
    document.cookie = 'token=fake-jwt-token;path=/';
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[var(--color-text)] mb-6">
          {t('SignIn.WelcomeBack')}
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              {t('SignIn.Email')}
            </label>
            <input
              type="email"
              id="email"
              defaultValue="john.doe@example.com"
              className="w-full text-[var(--color-text)] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text)] mb-1"
            >
              {t('SignIn.Password')}
            </label>
            <input
              type="password"
              id="password"
              defaultValue="password123"
              className="w-full text-[var(--color-text)] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              readOnly
            />
          </div>

          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full py-2 px-4"
          >
            {isLoading ? t('SignIn.SigningIn') : t('SignIn.SignIn')}
          </Button>
        </div>
      </div>
    </main>
  );
}

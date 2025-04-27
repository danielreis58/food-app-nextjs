import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Food app NextJS',
  description: 'Food app NextJS',
};

const nunito = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={nunito.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

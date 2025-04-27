import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Food app NextJS',
  description: 'Food app NextJS',
};

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}

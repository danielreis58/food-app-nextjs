import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Food app NextJS',
  description: 'Food app NextJS',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

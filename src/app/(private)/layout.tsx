import Header from '@/components/header/Header';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
}

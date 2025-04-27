import Header from '@/components/header/Header';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}

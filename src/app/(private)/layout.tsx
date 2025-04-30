'use client';

import Header from '@/components/header/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import Footer from '../../components/product/Footer';
import {
  cartFormSchema,
  CartFormValues,
  defaultValues,
} from '../../validators/cart';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const methods = useForm<CartFormValues>({
    resolver: zodResolver(cartFormSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {
    router.push('/checkout');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </form>
    </FormProvider>
  );
}

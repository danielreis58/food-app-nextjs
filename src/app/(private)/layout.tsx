'use client';

import Header from '@/components/header/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Footer from '../../components/product/Footer';
import {
  ProductFormValues,
  defaultValues,
  productFormSchema,
} from '../../validators/products';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </FormProvider>
  );
}

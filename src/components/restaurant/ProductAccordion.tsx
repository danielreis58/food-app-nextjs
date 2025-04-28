'use client';

import Typography from '@/components/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { type ProductCategory } from '@/constants/mock';
import { CircleDollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';

interface ProductAccordionProps {
  category: ProductCategory;
  restaurantId: string;
}

export default function ProductAccordion({
  category,
  restaurantId,
}: ProductAccordionProps) {
  const router = useRouter();

  return (
    <Accordion type="single" collapsible variant="solid">
      <AccordionItem value={category.id} className="bg-white rounded-none">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-1 items-start">
            <div className="flex items-center gap-2">
              <Typography
                element="span"
                variant="16-bold-700"
                className="text-neutral-800"
              >
                {category.name}
              </Typography>
              {category.products.some((product) => product.discountPrice) && (
                <CircleDollarSign
                  className="size-4 text-green-600"
                  strokeWidth={1.5}
                />
              )}
            </div>
            {category.description && (
              <Typography
                element="span"
                variant="14-regular-400"
                className="text-neutral-500 text-left"
              >
                {category.description}
              </Typography>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="rounded-none pb-0">
          <div className="flex flex-col">
            {category.products.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  router.push(
                    `/restaurant/${restaurantId}/product/${product.id}`,
                  )
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

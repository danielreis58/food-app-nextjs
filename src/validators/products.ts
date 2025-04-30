import { z } from 'zod';

export const productFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  quantity: z.number(),
  selectedSizeId: z.string().optional(),
  selectedAddonIds: z.array(z.string()).optional(),
  selectedCutleryId: z.string().optional(),
  selectedExtraIds: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const defaultValues: ProductFormValues = {
  id: '',
  name: '',
  description: '',
  price: 0,
  discountPrice: 0,
  tags: [],
  category: '',
  quantity: 0,
  selectedSizeId: undefined,
  selectedAddonIds: [],
  selectedCutleryId: undefined,
  selectedExtraIds: [],
  notes: '',
};

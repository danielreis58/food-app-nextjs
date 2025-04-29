import { z } from 'zod';

export const productFormSchema = z.object({
  quantity: z.number().min(1, 'Adicione pelo menos 1 item'),
  selectedSize: z.string().optional(),
  selectedAddons: z.array(z.string()).optional(),
  selectedCutlery: z.string().optional(),
  selectedExtras: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const defaultValues: ProductFormValues = {
  quantity: 0,
  selectedSize: '',
  selectedAddons: [],
  selectedCutlery: '',
  selectedExtras: [],
  notes: '',
};

import { z } from 'zod';
import { productFormSchema } from './products';

export const cartFormSchema = z.object({
  selectedProducts: z
    .array(productFormSchema)
    .refine((data) => data.length > 0, {
      message: 'Adicione pelo menos 1 item',
    }),
  selectedRestaurantId: z.string().min(1, 'Selecione um restaurante'),
});

export type CartFormValues = z.infer<typeof cartFormSchema>;

export const defaultValues: CartFormValues = {
  selectedProducts: [],
  selectedRestaurantId: '',
};

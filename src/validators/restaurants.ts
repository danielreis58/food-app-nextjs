import { z } from 'zod';
import { productFormSchema } from './products';

export const restaurantFormSchema = z.object({
  selectedProducts: z
    .array(productFormSchema)
    .refine((data) => data.length > 0, {
      message: 'Adicione pelo menos 1 item',
    }),
  selectedRestaurant: z.string().min(1, 'Selecione um restaurante'),
});

export type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

export const defaultValues: RestaurantFormValues = {
  selectedProducts: [],
  selectedRestaurant: '',
};

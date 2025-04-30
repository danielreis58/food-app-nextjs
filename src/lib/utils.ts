import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from '../constants/mock';
import { ProductFormValues } from '../validators/products';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generates a selection text based on the provided parameters.
 *
 * @param min - The minimum number of selections allowed.
 * @param max - The maximum number of selections allowed.
 * @param isRequired - Indicates if the selection is required.
 * @returns A string describing the selection options.
 */
export const getSelectionText = (
  min: number,
  max: number,
  isRequired: boolean,
): string => {
  if (!isRequired) return 'opcional';
  if (min === max && min === 1) return 'escolha 1';
  if (min === 1 && max > 1) return `escolha de ${min} a ${max}`;
  if (min === 0 && max === 1) return 'escolha até 1';
  return `escolha até ${max}`;
};

/**
 * Calculate current price based on selected options
 *
 * @param product - The product object containing price and options.
 * @param selectedProduct - The selected product form values.
 * @returns The calculated current price based on selected options.
 */
export const calculateCurrentPrice = (
  product: Product,
  selectedProduct: ProductFormValues,
): number => {
  const {
    quantity = 0,
    selectedSizeId,
    selectedCutleryId,
    selectedExtraIds,
  } = selectedProduct || {};

  const { sizeOptions, extraOptions, cutleryOptions } = product;

  let basePrice = product.discountPrice || product.price;

  // Add size price
  if (sizeOptions?.items && selectedSizeId) {
    const size = sizeOptions?.items.find((s) => s.id === selectedSizeId);
    if (size) {
      basePrice = size.discountPrice > 0 ? size.discountPrice : size.price;
    }
  }

  // Add extras price
  if (extraOptions?.items && selectedExtraIds && selectedExtraIds.length > 0) {
    for (const extraId of selectedExtraIds) {
      const extra = extraOptions?.items.find((e) => e.id === extraId);
      if (extra) {
        basePrice += extra.price;
      }
    }
  }

  // Add cutlery price
  if (cutleryOptions?.items && selectedCutleryId) {
    const cutlery = cutleryOptions?.items.find(
      (c) => c.id === selectedCutleryId,
    );
    if (cutlery) {
      basePrice += cutlery.price;
    }
  }

  return basePrice * quantity;
};

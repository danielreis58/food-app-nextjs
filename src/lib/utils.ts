import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

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

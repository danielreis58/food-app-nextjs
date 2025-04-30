import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TypographyVariant =
  | '12-semi-600'
  | '12-bold-700'
  | '14-regular-400'
  | '14-semi-600'
  | '14-bold-700'
  | '14-bold-800'
  | '16-bold-700'
  | '18-extrabold-800'
  | '20-bold-700'
  | '20-bold-800'
  | '20-extrabold-800';

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

interface TypographyProps {
  variant: TypographyVariant;
  element?: TypographyElement;
  className?: string;
  children: ReactNode;
}

export const Typography = ({
  variant,
  element: Element = 'p',
  className,
  children,
}: TypographyProps) => {
  const variants: Record<TypographyProps['variant'], string> = {
    '12-semi-600': 'text-[12px] font-semibold leading-[100%]',
    '12-bold-700': 'text-[12px] font-bold leading-[100%]',
    '14-regular-400': 'text-[14px] font-normal leading-[19px]',
    '14-semi-600': 'text-[14px] font-semibold leading-[21px]',
    '14-bold-700': 'text-[14px] font-bold leading-[19px]',
    '14-bold-800': 'text-[14px] font-extrabold leading-[100%]',
    '16-bold-700': 'text-[16px] font-bold leading-[100%]',
    '18-extrabold-800': 'text-[18px] font-extrabold leading-[100%]',
    '20-bold-700': 'text-[20px] font-bold leading-[100%]',
    '20-bold-800': 'text-[20px] font-extrabold leading-[100%]',
    '20-extrabold-800': 'text-[20px] font-extrabold leading-[100%]',
  };

  return (
    <Element className={cn(variants[variant], className)}>{children}</Element>
  );
};

export default Typography;

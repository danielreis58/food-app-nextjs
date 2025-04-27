import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TypographyVariant =
  | '16-bold-700'
  | '14-bold-700'
  | '20-bold-700'
  | '20-bold-800'
  | '14-bold-800'
  | '14-semi-600'
  | '14-regular-400';

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
    '16-bold-700': 'text-[16px] font-bold leading-[100%]',
    '14-bold-700': 'text-[14px] font-bold leading-[19px]',
    '20-bold-700': 'text-[20px] font-bold leading-[100%]',
    '20-bold-800': 'text-[20px] font-extrabold leading-[100%]',
    '14-bold-800': 'text-[14px] font-extrabold leading-[100%]',
    '14-semi-600': 'text-[14px] font-semibold leading-[21px]',
    '14-regular-400': 'text-[14px] font-normal leading-[19px]',
  };

  return (
    <Element className={cn(variants[variant], className)}>{children}</Element>
  );
};

export default Typography;

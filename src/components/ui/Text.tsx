import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { typographyClasses, type TypographyVariant } from '../../constants/typography';
import { cn } from '../../utils/cn';

type TextProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>;

export default function Text<T extends ElementType = 'span'>({
  as,
  variant = 'bodyMedium',
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = as ?? 'span';

  return (
    <Component className={cn(typographyClasses[variant], className)} {...rest}>
      {children}
    </Component>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-primaryText hover:bg-primaryDark disabled:opacity-40',
  secondary: 'bg-surfaceAlt text-textPrimary hover:bg-surface disabled:opacity-40',
  outline: 'bg-transparent text-textPrimary border border-border hover:bg-surfaceAlt disabled:opacity-40',
  danger: 'bg-danger text-white hover:bg-red-600 disabled:opacity-40',
  ghost: 'bg-transparent text-textSecondary hover:text-textPrimary disabled:opacity-40',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3',
  md: 'h-12 px-4',
  lg: 'h-14 px-6',
};

const SIZE_TYPOGRAPHY: Record<Size, string> = {
  sm: typographyClasses.labelLarge,
  md: typographyClasses.labelLarge,
  lg: typographyClasses.titleMedium,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl transition-colors',
        VARIANTS[variant],
        SIZES[size],
        SIZE_TYPOGRAPHY[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

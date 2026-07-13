import type { InputHTMLAttributes, ReactNode } from 'react';
import { typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';
import Text from './Text';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  rightSlot?: ReactNode;
  label?: string;
  error?: string;
}

export default function Input({ icon, rightSlot, label, error, className, id, ...rest }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className={cn('mb-2 block text-textPrimary', typographyClasses.titleSmall)}>
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex h-14 items-center gap-3 rounded-xl border border-border bg-surfaceAlt px-4',
          'focus-within:border-primary',
          error && 'border-danger',
        )}
      >
        {icon && <span className="shrink-0 text-textMuted">{icon}</span>}
        <input
          id={id}
          className={cn(
            'h-full w-full bg-transparent text-textPrimary placeholder:text-textMuted focus:outline-none',
            typographyClasses.bodyLarge,
            className,
          )}
          {...rest}
        />
        {rightSlot}
      </div>
      {error && <Text as="p" variant="bodySmall" className="mt-1.5 text-danger">{error}</Text>}
    </div>
  );
}

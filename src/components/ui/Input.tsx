import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

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
        <label htmlFor={id} className="mb-2 block text-sm font-bold text-textPrimary">
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
            'h-full w-full bg-transparent text-base text-textPrimary placeholder:text-textMuted focus:outline-none',
            className,
          )}
          {...rest}
        />
        {rightSlot}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

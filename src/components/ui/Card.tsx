import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export default function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-border bg-surfaceAlt', className)}
      {...rest}
    />
  );
}

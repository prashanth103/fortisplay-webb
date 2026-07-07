import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  /** Cap width like the mobile screens below lg, go wide above it (default). */
  wide?: boolean;
}

export default function ScreenContainer({ children, className, wide = true }: Props) {
  return (
    <main
      className={cn(
        'mx-auto w-full flex-1 px-4 py-4 lg:px-8 lg:py-8',
        wide ? 'max-w-md lg:max-w-6xl' : 'max-w-md',
        className,
      )}
    >
      {children}
    </main>
  );
}

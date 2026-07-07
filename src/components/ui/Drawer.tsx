import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  children: ReactNode;
  className?: string;
}

// Generic slide-over drawer (e.g. for a mobile nav menu). Not used by every
// screen today, kept simple and available for future use.
export default function Drawer({ open, onClose, side = 'left', children, className }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={cn(
          'absolute top-0 h-full w-72 max-w-[80%] bg-surfaceAlt shadow-2xl',
          side === 'left' ? 'left-0' : 'right-0',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

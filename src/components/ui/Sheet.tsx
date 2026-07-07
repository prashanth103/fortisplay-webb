import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Props {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  badge?: ReactNode;
  children: ReactNode;
  /** 'sheet' = bottom sheet with backdrop (mobile). 'panel' = always-visible side panel (desktop). */
  variant?: 'sheet' | 'panel';
  className?: string;
}

export default function Sheet({ open, onClose = () => {}, title, badge, children, variant = 'sheet', className }: Props) {
  if (variant === 'panel') {
    return (
      <div className={cn('rounded-2xl border border-border bg-surfaceAlt', className)}>
        {title && (
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            {badge}
            <h3 className="font-bold text-textPrimary">{title}</h3>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-t-2xl border border-border bg-surfaceAlt shadow-2xl',
          className,
        )}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            {badge}
            {title && <h3 className="font-bold text-textPrimary">{title}</h3>}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10"
            aria-label="Close"
          >
            <X size={16} className="text-textSecondary" />
          </button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}

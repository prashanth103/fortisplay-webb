import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, footer, className }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-md flex-col gap-4">
        <div
          className={cn(
            'w-full rounded-2xl bg-surfaceLight text-textOnLight shadow-2xl',
            className,
          )}
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 hover:bg-black/10"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-6 py-6">{children}</div>
        </div>
        {footer && <div className="flex gap-3">{footer}</div>}
      </div>
    </div>
  );
}
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'default' | 'danger';
  className?: string;
}

export default function EmptyState({ icon, title, description, action, tone = 'default', className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
      {icon && (
        <div
          className={cn(
            'mb-5 flex h-16 w-16 items-center justify-center rounded-full',
            tone === 'danger' ? 'bg-danger/10 text-danger' : 'bg-white/5 text-textSecondary',
          )}
        >
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-textPrimary">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-textSecondary">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

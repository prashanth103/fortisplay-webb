import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Text from './Text';

interface Props {
  badge?: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'default' | 'danger';
  className?: string;
}

export default function EmptyState({ badge, icon, title, description, action, tone = 'default', className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-20 text-center lg:py-16', className)}>
      {badge && <div className="mb-5">{badge}</div>}
      {icon && (
        <div
          className={cn(
            'mb-5 flex h-20 w-20 items-center justify-center rounded-full lg:h-16 lg:w-16',
            tone === 'danger' ? 'bg-danger/10 text-danger' : 'bg-surfaceAlt text-textSecondary',
          )}
        >
          {icon}
        </div>
      )}
      <Text as="h3" variant="headlineMedium" className="text-textPrimary">{title}</Text>
      {description && <Text as="p" variant="bodyMedium" className="mt-2 max-w-sm text-textSecondary">{description}</Text>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

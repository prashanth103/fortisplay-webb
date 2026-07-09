import { cn } from '../../utils/cn';

export interface TabItem {
  key: string;
  label: string;
  sub?: string;
}

interface Props {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}

export default function Tabs({ items, value, onChange, className }: Props) {
  return (
    <div className={cn('flex rounded-t-xl border-t-3 border-primary bg-surfaceAlt', className)}>
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              'flex-1 border-b-2 px-3 py-3 text-left transition-colors',
              active ? 'border-b-2 border-primary bg-primary/10' : 'border-b-2 border-transparent hover:bg-surface',
            )}
          >
            <div className={cn('text-sm font-bold', active ? 'text-primary' : 'text-textPrimary')}>
              {item.label}
            </div>
            {item.sub && <div className="text-xs text-textMuted">{item.sub}</div>}
          </button>
        );
      })}
    </div>
  );
}

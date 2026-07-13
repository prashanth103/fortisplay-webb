import { Check, Plus } from 'lucide-react';
import ColorBadge from './ColorBadge';
import { cn } from '../../utils/cn';
import type { Entry } from '../../types/betting';
import Text from '../ui/Text';

interface Props {
  entry: Entry;
  selected: boolean;
  selectionIndex?: number; // position number for multi-pick pools (Forecast/Trifecta/Quartet)
  onToggle: () => void;
}

export default function SelectableRow({ entry, selected, selectionIndex, onToggle }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-border/60 px-4 py-4 lg:px-5',
        selected && 'border-l-2 border-l-primary bg-primary/10',
      )}
    >
      <div className="flex items-center gap-4">
        <ColorBadge code={entry.code} />
        <Text variant="titleMedium" className="uppercase tracking-wide text-textPrimary">{entry.name}</Text>
      </div>
      <button
        onClick={onToggle}
        aria-pressed={selected}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-200',
          selected
            ? 'border-primary bg-primary text-primaryText'
            : 'border-primary/70 bg-surfaceAlt text-primary hover:bg-surface'
        )}
      >
        {selected ? (
          selectionIndex ? (
            <Text variant="titleMedium">{selectionIndex}</Text>
          ) : (
            <Check size={20} strokeWidth={3} />
          )
        ) : (
          <Plus size={26} strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}

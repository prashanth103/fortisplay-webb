import { Check, Plus } from 'lucide-react';
import ColorBadge from './ColorBadge';
import { cn } from '../../utils/cn';
import type { Entry } from '../../types/betting';

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
        <span className="font-bold uppercase tracking-wide text-textPrimary">{entry.name}</span>
      </div>
      <button
        onClick={onToggle}
        aria-pressed={selected}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border font-bold transition-colors',
          selected ? 'border-primary bg-primary text-primaryText' : 'border-border text-textSecondary hover:border-primary/60',
        )}
      >
        {selected ? (selectionIndex ? selectionIndex : <Check size={16} />) : <Plus size={16} />}
      </button>
    </div>
  );
}

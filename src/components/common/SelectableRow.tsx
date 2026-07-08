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
          'flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-200',
          selected
            ? 'border-primary bg-primary text-primaryText'
            : 'border-[#E4B83F] bg-[#3B3220] text-white hover:bg-[#463A24]'
        )}
      >
        {selected ? (
          selectionIndex ? (
            <span className="text-base font-bold">{selectionIndex}</span>
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

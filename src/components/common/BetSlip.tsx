import { FileText } from 'lucide-react';
import ColorBadge from './ColorBadge';
import Button from '../ui/Button';
import type { Entry } from '../../types/betting';
import { POOLS, type PoolKey } from '../../constants/theme';

interface Props {
  pool: PoolKey;
  entries: Entry[];
  stake: number;
  onStakeChange: (value: number) => void;
  onPlaceBet: () => void;
  onClear?: () => void;
}

export function BetSlipBadge({ count }: { count: number }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primaryText">
      {count}
    </span>
  );
}

export default function BetSlip({ pool, entries, stake, onStakeChange, onPlaceBet, onClear }: Props) {
  const poolMeta = POOLS.find((p) => p.key === pool)!;
  const complete = entries.length === poolMeta.picks;

  return (
    <div>
      <div className="rounded-xl bg-surfaceLight p-4 text-textOnLight">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-primaryDark">
            {poolMeta.label} · {poolMeta.sub}
          </span>
          <span className="text-xs font-bold uppercase tracking-wide text-black/40">Stake</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {entries.map((entry) => (
              <div key={entry.code} className="flex items-center gap-2">
                <ColorBadge code={entry.code} size="sm" />
                <span className="font-bold">{entry.name}</span>
              </div>
            ))}
          </div>
          <div className="flex h-11 w-24 shrink-0 items-center gap-1 rounded-lg border border-black/10 px-3">
            <span className="text-black/40">₱</span>
            <input
              type="number"
              min={1}
              value={stake}
              onChange={(e) => onStakeChange(Number(e.target.value) || 0)}
              className="w-full bg-transparent text-right font-bold outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {onClear && (
          <Button variant="outline" onClick={onClear} className="!text-textPrimary">
            Clear
          </Button>
        )}
        <Button fullWidth disabled={!complete || stake <= 0} onClick={onPlaceBet} icon={<FileText size={16} />}>
          Place Bet · ₱{stake}
        </Button>
      </div>
    </div>
  );
}

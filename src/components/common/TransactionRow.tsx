import ColorBadge from './ColorBadge';
import Card from '../ui/Card';
import type { Transaction } from '../../types/betting';

export function TransactionHeader() {
  return (
    <div className="hidden grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-2 text-xs font-bold uppercase tracking-wide text-textMuted lg:grid">
      <span>Entry</span>
      <span>Race · Pool</span>
      <span>Ticket / Time</span>
      <span className="text-right">Amount</span>
    </div>
  );
}

export default function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <Card className="flex items-center justify-between px-5 py-4 lg:grid lg:grid-cols-[auto_1fr_auto_auto] lg:items-center lg:gap-4">
      <div className="flex items-center gap-4">
        <ColorBadge code={tx.entryCode} />
        <div className="lg:hidden">
          <div className="flex items-center gap-2 font-bold text-textPrimary">
            {tx.raceId} · {tx.pool}
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primaryDark">{tx.order}</span>
          </div>
          <div className="text-xs text-textMuted">
            No. {tx.id} · {tx.time}
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 font-bold text-textPrimary lg:flex">
        {tx.raceId} · {tx.pool}
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primaryDark">{tx.order}</span>
      </div>
      <div className="hidden text-sm text-textMuted lg:block">
        No. {tx.id} · {tx.time}
      </div>

      <div className="font-bold text-textPrimary lg:text-right">₱{tx.amount}</div>
    </Card>
  );
}

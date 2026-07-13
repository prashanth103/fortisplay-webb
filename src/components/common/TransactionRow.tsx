import ColorBadge from './ColorBadge';
import Card from '../ui/Card';
import type { Transaction } from '../../types/betting';
import { typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';
import Text from '../ui/Text';

export function TransactionHeader() {
  return (
    <div className={cn('hidden grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-2 uppercase text-textMuted lg:grid', typographyClasses.labelMedium)}>
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
          <Text as="div" variant="titleMedium" className="flex items-center gap-2 text-textPrimary">
            {tx.raceId} · {tx.pool}
            <Text variant="labelSmall" className="rounded bg-primary/10 px-1.5 py-0.5 text-primaryDark">{tx.order}</Text>
          </Text>
          <Text as="div" variant="bodySmall" className="text-textMuted">
            No. {tx.id} · {tx.time}
          </Text>
        </div>
      </div>

      <Text as="div" variant="titleMedium" className="hidden items-center gap-2 text-textPrimary lg:flex">
        {tx.raceId} · {tx.pool}
        <Text variant="labelSmall" className="rounded bg-primary/10 px-1.5 py-0.5 text-primaryDark">{tx.order}</Text>
      </Text>
      <Text as="div" variant="bodyMedium" className="hidden text-textMuted lg:block">
        No. {tx.id} · {tx.time}
      </Text>

      <Text as="div" variant="titleMedium" className="text-textPrimary lg:text-right">₱{tx.amount}</Text>
    </Card>
  );
}

import { useMemo, useState } from 'react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import StatCard from '../../../components/common/StatCard';
import SearchInput from '../../../components/common/SearchInput';
import TransactionRow, { TransactionHeader } from '../../../components/common/TransactionRow';
import EmptyState from '../../../components/ui/EmptyState';
import { SALES_SUMMARY, TRANSACTIONS } from '../mock';

export default function SalesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TRANSACTIONS;
    return TRANSACTIONS.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.entryCode.toLowerCase().includes(q) ||
        t.pool.toLowerCase().includes(q) ||
        t.raceId.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <ScreenContainer>
      <h1 className="text-2xl font-bold">Sales</h1>
      <p className="mb-5 text-textSecondary">Today&apos;s transactions</p>

      <div className="mb-5 grid grid-cols-2 gap-4 lg:max-w-md">
        <StatCard label="Total Sales" value={`₱ ${SALES_SUMMARY.totalSales}`} />
        <StatCard label="Tickets" value={`${SALES_SUMMARY.ticketCount}`} />
      </div>

      <div className="mb-4">
        <SearchInput value={query} onChange={setQuery} placeholder="Search ticket no., color or pool…" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No transactions found" description="Try a different ticket number, color or pool." />
      ) : (
        <div className="flex flex-col gap-3">
          <TransactionHeader />
          {filtered.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </ScreenContainer>
  );
}

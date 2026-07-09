import { type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpLeft, CreditCard, Percent, TrendingUp, Wallet as WalletIcon, X } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import Card from '../../../components/ui/Card';
import { useAuth } from '../../auth/context/useAuth';
import { WALLET_SUMMARY, WALLET_TRANSACTIONS } from '../mock';
import { cn } from '../../../utils/cn';

export default function WalletPage() {
  const { user } = useAuth();

  return (
    <ScreenContainer>
      <h1 className="text-2xl font-bold">Wallet</h1>
      <p className="mb-6 text-textSecondary">Today&apos;s cash flow</p>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="mb-4 flex items-center gap-4 border-none bg-[#151A2E] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-textSecondary">Total Sales</div>
              <div className="text-2xl font-bold">₱ {WALLET_SUMMARY.totalSales}</div>
            </div>
          </Card>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <Card className="border-none bg-primary p-5 text-primaryText">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-black/10">
                <WalletIcon size={20} />
              </div>
              <div className="text-2xl font-bold">₱ {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide">Cash In Hand</div>
            </Card>
            <Card className="border-none bg-[#151A2E] p-5">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Percent size={20} />
              </div>
              <div className="text-2xl font-bold">₱ {WALLET_SUMMARY.commission.toFixed(2)}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide text-textSecondary">My Commission</div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 xl:grid-cols-4 lg:gap-4">
            <StatTile icon={<ArrowDownRight size={18} />} value={WALLET_SUMMARY.received} label="Received" />
            <StatTile icon={<ArrowUpLeft size={18} />} value={WALLET_SUMMARY.remitted} label="Remitted" />
            <StatTile icon={<X size={18} />} value={WALLET_SUMMARY.cancelled} label="Cancel" />
            <StatTile icon={<CreditCard size={18} />} value={WALLET_SUMMARY.payouts} label="Payouts" />
          </div>

          <div className="mt-8 hidden items-center justify-between border-t border-border pt-5 text-xs text-textMuted lg:flex">
            <span>Copyright Protected.</span>
            <span>
              Powered by <span className="font-bold text-textSecondary">NorthAlley.</span>
            </span>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-textMuted">Transaction History</h2>
          <div className="flex flex-col gap-3">
            {WALLET_TRANSACTIONS.map((tx) => (
              <Card key={tx.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      tx.type === 'received' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
                    )}
                  >
                    {tx.type === 'received' ? <ArrowDownRight size={18} /> : <ArrowUpLeft size={18} />}
                  </span>
                  <div>
                    <div className="font-bold capitalize">{tx.type}</div>
                    <div className="text-xs text-textMuted">
                      {tx.method} · {tx.time}
                    </div>
                  </div>
                </div>
                <div className={cn('font-bold', tx.type === 'received' ? 'text-success' : 'text-danger')}>
                  {tx.type === 'received' ? '+' : '-'}₱{tx.amount}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-xs text-textMuted lg:hidden">
        <span>Copyright Protected.</span>
        <span>
          Powered by <span className="font-bold text-textSecondary">NorthAlley.</span>
        </span>
      </div>
    </ScreenContainer>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <Card className="h-full border-none bg-surfaceLight p-4">
      <div className="flex h-full items-center justify-between">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cardIconBg text-cardIcon">
          {icon}
        </div>

        {/* Content */}
        <div className="ml-4 flex-1 text-right">
          <div className="text-lg font-bold leading-none text-textOnLight">
            ₱ {value}
          </div>

          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-black/40">
            {label}
          </div>
        </div>
      </div>
    </Card>
  );
}
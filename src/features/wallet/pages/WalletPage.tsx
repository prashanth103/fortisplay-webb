import { type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpLeft, CreditCard, Percent, TrendingUp, Wallet as WalletIcon, X } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import Card from '../../../components/ui/Card';
import Text from '../../../components/ui/Text';
import { useAuth } from '../../auth/context/useAuth';
import { WALLET_SUMMARY, WALLET_TRANSACTIONS } from '../mock';
import { cn } from '../../../utils/cn';
import { typographyClasses } from '../../../constants/typography';

export default function WalletPage() {
  const { user } = useAuth();

  return (
    <ScreenContainer>
      <Text as="h1" variant="headlineLarge">Wallet</Text>
      <Text as="p" variant="bodyMedium" className="mb-6 text-textSecondary">Today&apos;s cash flow</Text>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="mb-4 flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <TrendingUp size={22} />
            </div>
            <div>
              <Text as="div" variant="labelMedium" className="uppercase text-textSecondary">Total Sales</Text>
              <Text as="div" variant="headlineLarge">₱ {WALLET_SUMMARY.totalSales}</Text>
            </div>
          </Card>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <Card className="border-none bg-primary p-5 text-primaryText">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-black/10">
                <WalletIcon size={20} />
              </div>
              <Text as="div" variant="headlineLarge">₱ {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              <Text as="div" variant="labelMedium" className="mt-1 uppercase">Cash In Hand</Text>
            </Card>
            <Card className="p-5">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Percent size={20} />
              </div>
              <Text as="div" variant="headlineLarge">₱ {WALLET_SUMMARY.commission.toFixed(2)}</Text>
              <Text as="div" variant="labelMedium" className="mt-1 uppercase text-textSecondary">My Commission</Text>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 xl:grid-cols-4 lg:gap-4">
            <StatTile icon={<ArrowDownRight size={18} />} value={WALLET_SUMMARY.received} label="Received" />
            <StatTile icon={<ArrowUpLeft size={18} />} value={WALLET_SUMMARY.remitted} label="Remitted" />
            <StatTile icon={<X size={18} />} value={WALLET_SUMMARY.cancelled} label="Cancel" />
            <StatTile icon={<CreditCard size={18} />} value={WALLET_SUMMARY.payouts} label="Payouts" />
          </div>

          <div className={cn('mt-8 hidden items-center justify-between border-t border-border pt-5 text-textMuted lg:flex', typographyClasses.bodySmall)}>
            <span>Copyright Protected.</span>
            <span>
              Powered by <Text variant="labelMedium" className="text-textSecondary">NorthAlley.</Text>
            </span>
          </div>
        </div>

        <div>
          <Text as="h2" variant="labelMedium" className="mb-3 uppercase text-textMuted">Transaction History</Text>
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
                    <Text as="div" variant="titleMedium" className="capitalize">{tx.type}</Text>
                    <Text as="div" variant="bodySmall" className="text-textMuted">
                      {tx.method} · {tx.time}
                    </Text>
                  </div>
                </div>
                <Text as="div" variant="titleMedium" className={tx.type === 'received' ? 'text-success' : 'text-danger'}>
                  {tx.type === 'received' ? '+' : '-'}₱{tx.amount}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('mt-8 flex items-center justify-between border-t border-border pt-5 text-textMuted lg:hidden', typographyClasses.bodySmall)}>
        <span>Copyright Protected.</span>
        <span>
          Powered by <Text variant="labelMedium" className="text-textSecondary">NorthAlley.</Text>
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
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cardIconBg text-cardIcon">
          {icon}
        </div>

        <div className="ml-4 flex-1 text-right">
          <Text as="div" variant="titleLarge" className="text-textOnLight">
            ₱ {value}
          </Text>

          <Text as="div" variant="labelMedium" className="mt-1 uppercase text-textMuted">
            {label}
          </Text>
        </div>
      </div>
    </Card>
  );
}

import { useState, type FormEvent } from 'react';
import { QrCode, ScanLine } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Text from '../../../components/ui/Text';
import ColorBadge from '../../../components/common/ColorBadge';
import { findTicket, type PayoutTicket } from '../mock';
import { ENTRY_COLORS } from '../../../constants/theme';
import { typographyClasses } from '../../../constants/typography';
import { cn } from '../../../utils/cn';

export default function PayoutsPage() {
  const [ticketNo, setTicketNo] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<PayoutTicket | null>(null);

  const handleVerify = (e?: FormEvent) => {
    e?.preventDefault();
    const found = findTicket(ticketNo);
    if (!found) {
      setError('Ticket not found. Check the number and try again.');
      setResult(null);
    } else {
      setError('');
      setResult(found);
    }
  };

  const reset = () => {
    setResult(null);
    setTicketNo('');
    setError('');
  };

  return (
    <ScreenContainer wide={false} className="lg:max-w-lg">
      <Text as="h1" variant="headlineLarge">Payouts</Text>
      <Text as="p" variant="bodyMedium" className="mb-6 text-textSecondary">Scan or enter a ticket to verify</Text>

      {!result ? (
        <div>
          <button className="mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center">
            <div className="relative flex h-2/3 w-2/3 items-center justify-center rounded-xl border border-border bg-surfaceAlt">
              <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-primary" />
              <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-primary" />
              <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-primary" />
              <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-primary" />
              <QrCode size={48} className="text-textMuted/30" />
            </div>
          </button>

          <div className="mt-5 flex justify-center">
            <Button className="w-72" icon={<ScanLine size={16} />}>
              Scan Ticket
            </Button>
          </div>

          <div className={cn('my-5 flex items-center gap-3 uppercase text-textMuted', typographyClasses.labelMedium)}>
            <span className="h-px flex-1 bg-border" /> Or enter ticket number <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleVerify} className="flex gap-3">
            <Input
              icon={<Text variant="bodySmall">#</Text>}
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              placeholder="e.g. 8266I50525"
            />
            <Button type="submit" variant="secondary" className="!text-primary">
              Verify
            </Button>
          </form>
          {error && <Text as="p" variant="labelLarge" className="mt-3 text-danger">{error}</Text>}
        </div>
      ) : (
        <>
          <Card className="border-none bg-surfaceLight p-0 text-textOnLight">
            <div className="flex items-center justify-between px-5 py-4">
              <Text as="h2" variant="titleLarge">Ticket Details</Text>
              {result.status === 'won' && (
                <Text className="rounded-full bg-success/15 px-3 py-1 uppercase text-success" variant="labelMedium">
                  Won
                </Text>
              )}
              {result.status === 'lost' && (
                <Text className="uppercase text-black/40" variant="labelMedium">Lost</Text>
              )}
              {result.status === 'pending' && (
                <Text className="rounded-full bg-warning/15 px-3 py-1 uppercase text-primaryDark" variant="labelMedium">
                  Pending
                </Text>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-black/10 px-5 py-4">
              <ColorBadge
                code={result.entryCode as 'YW' | 'LG' | 'OR' | 'RD' | 'VT' | 'PK' | 'IV' | 'SB' | 'SV'}
                size="lg"
              />
              <div>
                <Text as="div" variant="titleMedium" className="flex items-center gap-2">
                  {result.raceId} · {result.pool}
                  <Text className="rounded bg-black/5 px-1.5 py-0.5 text-primaryDark" variant="labelSmall">EXACT</Text>
                </Text>
                <Text as="div" variant="bodyMedium" className="text-black/50">
                  {ENTRY_COLORS[result.entryCode as 'YW' | 'LG' | 'OR' | 'RD' | 'VT' | 'PK' | 'IV' | 'SB' | 'SV']?.name}
                </Text>
              </div>
            </div>

            <div className={cn('space-y-2 border-t border-black/10 px-5 py-4', typographyClasses.bodyMedium)}>
              <div className="flex justify-between">
                <span className="text-black/50">Ticket</span>
                <Text variant="titleSmall">No. {result.id}</Text>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">Date</span>
                <Text variant="titleSmall">{result.date}</Text>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">Bet Amount</span>
                <Text variant="titleSmall">₱{result.amount}</Text>
              </div>
            </div>

            <div className="p-5 pt-0">
              {result.status === 'won' && (
                <div className="flex items-center justify-between rounded-xl bg-success/10 px-5 py-4">
                  <Text variant="titleSmall" className="uppercase tracking-wide text-success">Payout Due</Text>
                  <Text variant="headlineLarge" className="text-success">₱ {result.payout}</Text>
                </div>
              )}
              {result.status === 'lost' && (
                <Text as="div" variant="labelLarge" className="rounded-xl bg-black/5 px-5 py-4 text-center text-black/50">
                  No payout - this ticket did not win.
                </Text>
              )}
              {result.status === 'pending' && (
                <Text as="div" variant="labelLarge" className="rounded-xl bg-warning/10 px-5 py-4 text-center text-primaryDark">
                  Race not finished - payout pending result.
                </Text>
              )}
            </div>
          </Card>

          <Button fullWidth variant="outline" size="lg" className="mt-5" onClick={reset}>
            Scan Another
          </Button>
        </>
      )}
    </ScreenContainer>
  );
}

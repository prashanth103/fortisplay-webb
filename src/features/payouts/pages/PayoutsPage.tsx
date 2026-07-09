import { useState, type FormEvent } from 'react';
import { QrCode, ScanLine } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import ColorBadge from '../../../components/common/ColorBadge';
import { findTicket, type PayoutTicket } from '../mock';
import { ENTRY_COLORS } from '../../../constants/theme';

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
      <h1 className="text-2xl font-bold">Payouts</h1>
      <p className="mb-6 text-textSecondary">Scan or enter a ticket to verify</p>

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

          <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-textMuted">
            <span className="h-px flex-1 bg-border" /> Or enter ticket number <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleVerify} className="flex gap-3">
            <Input
              icon={<span className="text-xs">#</span>}
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              placeholder="e.g. 8266I50525"
            />
            <Button type="submit" variant="secondary" className="!text-primary">
              Verify
            </Button>
          </form>
          {error && <p className="mt-3 text-sm font-semibold text-danger">{error}</p>}
        </div>
      ) : (
        <>
          <Card className="border-none bg-surfaceLight p-0 text-textOnLight">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-lg font-bold">Ticket Details</h2>
              {result.status === 'won' && (
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">
                  Won
                </span>
              )}
              {result.status === 'lost' && (
                <span className="text-xs font-bold uppercase tracking-wide text-black/40">Lost</span>
              )}
              {result.status === 'pending' && (
                <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primaryDark">
                  Pending
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-black/10 px-5 py-4">
              <ColorBadge
                code={result.entryCode as 'YW' | 'LG' | 'OR' | 'RD' | 'VT' | 'PK' | 'IV' | 'SB' | 'SV'}
                size="lg"
              />
              <div>
                <div className="flex items-center gap-2 font-bold">
                  {result.raceId} · {result.pool}
                  <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-bold text-primaryDark">EXACT</span>
                </div>
                <div className="text-sm text-black/50">{ENTRY_COLORS[result.entryCode as 'YW' | 'LG' | 'OR' | 'RD' | 'VT' | 'PK' | 'IV' | 'SB' | 'SV']?.name}</div>
              </div>
            </div>

            <div className="space-y-2 border-t border-black/10 px-5 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-black/50">Ticket</span>
                <span className="font-bold">No. {result.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">Date</span>
                <span className="font-bold">{result.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">Bet Amount</span>
                <span className="font-bold">₱{result.amount}</span>
              </div>
            </div>

            <div className="p-5 pt-0">
              {result.status === 'won' && (
                <div className="flex items-center justify-between rounded-xl bg-success/10 px-5 py-4">
                  <span className="text-sm font-bold uppercase tracking-wide text-success">Payout Due</span>
                  <span className="text-2xl font-bold text-success">₱ {result.payout}</span>
                </div>
              )}
              {result.status === 'lost' && (
                <div className="rounded-xl bg-black/5 px-5 py-4 text-center font-semibold text-black/50">
                  No payout — this ticket did not win.
                </div>
              )}
              {result.status === 'pending' && (
                <div className="rounded-xl bg-warning/10 px-5 py-4 text-center font-semibold text-primaryDark">
                  Race not finished — payout pending result.
                </div>
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

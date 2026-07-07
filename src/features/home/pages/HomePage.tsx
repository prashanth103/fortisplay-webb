import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Video, X } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import RaceTabs from '../../../components/common/RaceTabs';
import SelectableRow from '../../../components/common/SelectableRow';
import ColorBadge from '../../../components/common/ColorBadge';
import BetSlip, { BetSlipBadge } from '../../../components/common/BetSlip';
import Tabs from '../../../components/ui/Tabs';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Sheet from '../../../components/ui/Sheet';
import EmptyState from '../../../components/ui/EmptyState';
import TicketQR from '../../../components/common/TicketQR';
import { ENTRIES, RACES } from '../mock';
import { POOLS, type PoolKey } from '../../../constants/theme';
import type { Entry } from '../../../types/betting';

function randomTicketNo() {
  return Math.random().toString(36).slice(2, 12).padStart(10, '0');
}

export default function HomePage() {
  const navigate = useNavigate();
  const [races] = useState(RACES);
  const [activeRaceId, setActiveRaceId] = useState(
    races.find((r) => r.status === 'upcoming')?.id ?? races[0].id,
  );
  const [pool, setPool] = useState<PoolKey>('WIN');
  const [selections, setSelections] = useState<Entry[]>([]);
  const [stake, setStake] = useState(5);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ticket, setTicket] = useState<{ id: string; pool: PoolKey; entries: Entry[]; amount: number } | null>(null);

  const activeRace = races.find((r) => r.id === activeRaceId)!;
  const poolMeta = POOLS.find((p) => p.key === pool)!;

  const selectRace = (id: string) => {
    setActiveRaceId(id);
    setSelections([]);
  };

  const selectPool = (key: string) => {
    setPool(key as PoolKey);
    setSelections([]);
  };

  const toggleEntry = (entry: Entry) => {
    setSelections((prev) => {
      const exists = prev.find((e) => e.code === entry.code);
      if (exists) return prev.filter((e) => e.code !== entry.code);
      if (poolMeta.picks === 1) return [entry];
      if (prev.length >= poolMeta.picks) return prev;
      return [...prev, entry];
    });
  };

  const selectionIndex = (code: string) => {
    const idx = selections.findIndex((e) => e.code === code);
    return idx === -1 ? undefined : idx + 1;
  };

  const closeSlip = () => setSelections([]);

  const confirmBet = () => setConfirmOpen(true);

  const placeBet = () => {
    setConfirmOpen(false);
    setTicket({ id: randomTicketNo(), pool, entries: selections, amount: stake });
    setSelections([]);
  };

  const betSlip = useMemo(
    () =>
      selections.length > 0 ? (
        <BetSlip
          pool={pool}
          entries={selections}
          stake={stake}
          onStakeChange={setStake}
          onPlaceBet={confirmBet}
          onClear={closeSlip}
        />
      ) : (
        <EmptyState
          title="Your bet slip is empty"
          description="Pick an entry from the list to start a bet."
        />
      ),
    [selections, stake, pool],
  );

  return (
    <ScreenContainer>
      <RaceTabs races={races} activeId={activeRaceId} onSelect={selectRace} className="mb-5" />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeRace.status === 'finished' && activeRace.results && (
            <Card className="border-success/40">
              <div className="border-b border-border px-5 py-4 text-center font-bold uppercase tracking-wide">
                {activeRace.id} Results
              </div>
              <div className="divide-y divide-border">
                {activeRace.results.map((result) => (
                  <div key={result.pool} className="flex items-center gap-6 px-5 py-5">
                    <span className="w-24 shrink-0 font-bold uppercase tracking-wide text-primary">
                      {result.pool}
                    </span>
                    <div className="flex gap-6">
                      {result.order.map((code, i) => (
                        <div key={code} className="flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-textMuted">P{i + 1}</span>
                          <ColorBadge code={code} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeRace.status === 'live' && (
            <Card className="border-danger/50">
              <EmptyState
                icon={<Lock size={28} />}
                title="Bets Closed"
                description={`Betting for ${activeRace.id} is now closed. The race is underway — watch it live.`}
                action={
                  <Button variant="danger" icon={<Video size={16} />} onClick={() => navigate('/watch')}>
                    Watch Live
                  </Button>
                }
              />
            </Card>
          )}

          {activeRace.status === 'upcoming' && (
            <Card className="overflow-hidden">
              <Tabs items={POOLS.map((p) => ({ key: p.key, label: p.label, sub: p.sub }))} value={pool} onChange={selectPool} />
              <div>
                {ENTRIES.map((entry) => (
                  <SelectableRow
                    key={entry.code}
                    entry={entry}
                    selected={!!selections.find((e) => e.code === entry.code)}
                    selectionIndex={poolMeta.picks > 1 ? selectionIndex(entry.code) : undefined}
                    onToggle={() => toggleEntry(entry)}
                  />
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="hidden lg:block">
          <Sheet variant="panel" title="Bet Slip" badge={<BetSlipBadge count={selections.length} />}>
            {betSlip}
          </Sheet>
        </div>
      </div>

      {/* Mobile bet slip: fixed panel above the bottom nav, no backdrop */}
      {selections.length > 0 && (
        <div className="fixed inset-x-0 bottom-16 z-20 border-t border-border bg-surfaceAlt px-4 pb-4 pt-3 shadow-2xl lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <BetSlipBadge count={selections.length} /> Bet Slip
            </div>
            <button onClick={closeSlip} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-textSecondary">
              <X size={16} />
            </button>
          </div>
          {betSlip}
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Bet"
        footer={
          <>
            <Button variant="outline" fullWidth className="!border-black/15 !text-textOnLight" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button fullWidth onClick={placeBet}>
              Place Bet
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4">
          <span className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-primary">
            {activeRace.id} · Race {activeRace.raceNo}
          </span>
          <TicketQR seed={`${activeRace.id}-${pool}-${selections.map((e) => e.code).join('')}`} />
          <div className="flex w-full items-center justify-between border-t border-black/10 pt-4 text-center">
            <div>
              <div className="text-sm font-bold text-primaryDark">{poolMeta.label}</div>
              <div className="text-xs text-black/40">Pool</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {selections.map((e) => (
                  <ColorBadge key={e.code} code={e.code} />
                ))}
              </div>
              <div className="text-sm font-bold uppercase">{selections.map((e) => e.name).join(' / ')}</div>
            </div>
            <div>
              <div className="text-sm font-bold">EXACT</div>
              <div className="text-xs text-black/40">Order</div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between border-t border-black/10 pt-4">
            <span className="font-bold">Total Amount</span>
            <span className="rounded-lg border border-primary px-3 py-1 font-bold text-primaryDark">₱{stake}</span>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!ticket}
        onClose={() => setTicket(null)}
        title="Ticket"
        footer={
          <>
            <Button variant="outline" fullWidth className="!border-black/15 !text-textOnLight" onClick={() => setTicket(null)}>
              Close
            </Button>
            <Button fullWidth icon={<span>🖨️</span>}>
              Print Ticket
            </Button>
          </>
        }
      >
        {ticket && (
          <div className="flex flex-col items-center gap-4">
            <span className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-primary">KB · FIXED ODDS</span>
            <TicketQR seed={ticket.id} />
            <p className="text-sm text-black/60">No. {ticket.id}</p>
            <div className="w-full space-y-3 border-t border-black/10 pt-4 text-sm">
              <Row label="Date" value={new Date().toLocaleString()} />
              <Row label="Pool" value={ticket.pool} />
              <Row label="Order Preference" value="EXACT" />
              <Row label="Variant" value="Fixed Odds" />
              <Row label="Tickets" value={ticket.entries.map((e) => e.code).join(', ')} />
            </div>
            <div className="flex w-full items-center justify-between border-t border-black/10 pt-4">
              <span className="text-lg font-bold">TOTAL</span>
              <span className="rounded-lg border border-primary px-3 py-1 text-lg font-bold text-primaryDark">
                ₱{ticket.amount.toFixed(2)}
              </span>
            </div>
            <p className="text-center text-xs text-black/40">Valid for 60 days. Ticket required for all payouts.</p>
          </div>
        )}
      </Modal>
    </ScreenContainer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-black/50">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

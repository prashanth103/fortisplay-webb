import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Printer, Video, X } from 'lucide-react';
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
import TicketDivider from '../../../components/common/TicketDivider';

function randomTicketNo() {
  return Math.random().toString(36).slice(2, 12).padStart(10, '0');
}

export default function HomePage() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isMobileSlipOpen = selections.length > 0 && !isDesktop;

  useEffect(() => {
    if (isMobileSlipOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMobileSlipOpen]);

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
          onClose={closeSlip}
        />
      ) : (
        <EmptyState
          title="Your bet slip is empty"
          description="Pick an entry from the list to start a bet."
        />
      ),
    [selections, stake, pool],
  );

  if (isMobileSlipOpen) {
    return (
      <ScreenContainer
        className="max-w-md overflow-hidden flex flex-col"
        style={{
          position: 'fixed',
          top: 73,
          bottom: 64,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: 16,
          paddingBottom: 0,
          paddingLeft: 16,
          paddingRight: 16,
          height: 'calc(100dvh - 137px)',
        }}
      >
        <RaceTabs races={races} activeId={activeRaceId} onSelect={selectRace} className="mb-4 shrink-0" />

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden mb-4">
          {activeRace.status === 'finished' && activeRace.results && (
            <Card className="flex-1 overflow-y-auto border-success/40">
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
            <Card className="flex-1 overflow-y-auto border-danger/50">
              <EmptyState
                badge={
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-danger">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger" /> Live Now
                  </span>
                }
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
            <Card className="flex flex-col overflow-hidden min-h-0 flex-1">
              <Tabs items={POOLS.map((p) => ({ key: p.key, label: p.label, sub: p.sub }))} value={pool} onChange={selectPool} className="shrink-0" />
              <div className="overflow-y-auto flex-1">
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

        {/* Mobile docked Bet Slip */}
        <div className="shrink-0">
          <BetSlip
            pool={pool}
            entries={selections}
            stake={stake}
            onStakeChange={setStake}
            onPlaceBet={confirmBet}
            onClose={closeSlip}
            isMobileDock={true}
          />
        </div>

        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Confirm Bet"
          footer={
            <>
              <Button variant="outline" fullWidth className="!border-white/15 !text-white" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button fullWidth onClick={placeBet}>
                Place Bet
              </Button>
            </>
          }
        >
          <div className="flex flex-col items-center gap-4">
            <span className="rounded-full bg-black px-4 py-1.5 text-sm font-bold text-primary">
              {activeRace.id} · RACE {activeRace.raceNo}
            </span>
            <TicketQR seed={`${activeRace.id}-${pool}-${selections.map((e) => e.code).join('')}`} />
            <TicketDivider />
            <div className="flex w-full items-center justify-between text-center">
              <div>
                <div className="text-sm font-bold text-primaryDark">{poolMeta.label}</div>
                <div className="text-xs text-black/40">Pool</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  {selections.map((e) => (
                    <ColorBadge key={e.code} code={e.code} size="lg" />
                  ))}
                </div>
                <div className="text-sm font-bold uppercase">{selections.map((e) => e.name).join(' / ')}</div>
              </div>
              <div>
                <div className="text-sm font-bold">EXACT</div>
                <div className="text-xs text-black/40">Order</div>
              </div>
            </div>
            <TicketDivider />
            <div className="flex w-full items-center justify-between">
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
              <Button variant="outline" fullWidth className="!border-white/15 !text-white" onClick={() => setTicket(null)}>
                Close
              </Button>
              <Button fullWidth icon={<Printer size={16} />}>
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
              <TicketDivider />
              <div className="w-full space-y-3 text-sm">
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
                badge={
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-danger">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger" /> Live Now
                  </span>
                }
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

      {/* Mobile bet slip: floating card fixed above the bottom nav */}
      {selections.length > 0 && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 72,
            zIndex: 20,
          }}
        >
          {betSlip}
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Bet"
        footer={
          <>
            <Button variant="outline" fullWidth className="!border-white/15 !text-white" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button fullWidth onClick={placeBet}>
              Place Bet
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4">
          <span className="rounded-full bg-black px-4 py-1.5 text-sm font-bold text-primary">
            {activeRace.id} · RACE {activeRace.raceNo}
          </span>
          <TicketQR seed={`${activeRace.id}-${pool}-${selections.map((e) => e.code).join('')}`} />
          <TicketDivider />
          <div className="flex w-full items-center justify-between text-center">
            <div>
              <div className="text-sm font-bold text-primaryDark">{poolMeta.label}</div>
              <div className="text-xs text-black/40">Pool</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {selections.map((e) => (
                  <ColorBadge key={e.code} code={e.code} size="lg" />
                ))}
              </div>
              <div className="text-sm font-bold uppercase">{selections.map((e) => e.name).join(' / ')}</div>
            </div>
            <div>
              <div className="text-sm font-bold">EXACT</div>
              <div className="text-xs text-black/40">Order</div>
            </div>
          </div>
          <TicketDivider />
          <div className="flex w-full items-center justify-between">
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
            <Button variant="outline" fullWidth className="!border-white/15 !text-white" onClick={() => setTicket(null)}>
              Close
            </Button>
            <Button fullWidth icon={<Printer size={16} />}>
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
            <TicketDivider />
            <div className="w-full space-y-3 text-sm">
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

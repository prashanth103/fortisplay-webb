import { useState } from 'react';
import { Clock, Eye, Maximize2, Play, Volume2 } from 'lucide-react';
import ScreenContainer from '../../../components/layout/ScreenContainer';
import StatusBadge from '../../../components/common/StatusBadge';
import { RACES } from '../../home/mock';
import { useCountdown } from '../../../hooks/useCountdown';
import { cn } from '../../../utils/cn';

const STATUS_MAP = { finished: 'ended', live: 'live', upcoming: 'upcoming' } as const;
const BAR_LABEL = { finished: 'ENDED', live: 'LIVE', upcoming: 'UPCOMING' } as const;

export default function WatchPage() {
  const [activeId, setActiveId] = useState(RACES.find((r) => r.status === 'live')?.id ?? RACES[0].id);
  const active = RACES.find((r) => r.id === activeId)!;
  const countdown = useCountdown(active.status === 'upcoming' ? active.closesAt : undefined);

  return (
    <ScreenContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,#1c1c1f_0_10px,#141416_10px_20px)]">
            {active.status === 'live' && (
              <>
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-danger">
                  <span className="h-2 w-2 rounded-full bg-danger" /> LIVE
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                  <Eye size={14} /> 1.2K watching
                </div>
                <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Play size={26} fill="currentColor" />
                </button>
                <p className="absolute bottom-14 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest text-white/40">
                  Live Race Feed
                </p>
              </>
            )}

            {active.status === 'upcoming' && (
              <>
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-textSecondary">
                  <span className="h-2 w-2 rounded-full bg-textMuted" /> UPCOMING
                </div>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                    <Clock size={26} />
                  </span>
                  <span className="text-lg font-bold text-white">Live in {countdown.label}</span>
                </div>
              </>
            )}

            {active.status === 'finished' && (
              <>
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> ENDED
                </div>
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success">
                    <Play size={26} fill="currentColor" />
                  </button>
                  <span className="text-sm font-semibold text-white/70">Race ended · Replay available</span>
                </div>
              </>
            )}

            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 text-white">
              <Volume2 size={18} />
              <div className="h-1 flex-1 rounded-full bg-white/20">
                <div
                  className={cn(
                    'h-1 rounded-full',
                    active.status === 'live' && 'w-4/5 bg-danger',
                    active.status === 'finished' && 'w-full bg-success',
                    active.status === 'upcoming' && 'w-0 bg-textMuted',
                  )}
                />
              </div>
              <span className="text-xs font-bold">{BAR_LABEL[active.status]}</span>
              <Maximize2 size={16} />
            </div>
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            {active.id} · {active.label}
          </h1>
          <p className="text-textSecondary">
            Race {active.raceNo} ·{' '}
            {active.status === 'live'
              ? 'Streaming live now'
              : active.status === 'finished'
                ? 'Race has ended'
                : 'Starts soon'}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-textMuted">Live &amp; Upcoming Races</h2>
          <div className="flex flex-col gap-3">
            {RACES.map((race) => (
              <button
                key={race.id}
                onClick={() => setActiveId(race.id)}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors',
                  race.id === activeId ? 'border-primary bg-primary/10' : 'border-border bg-surfaceAlt hover:bg-surface',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-14 items-center justify-center rounded-md bg-surface text-textMuted">
                    <Play size={16} />
                  </span>
                  <div>
                    <div className="font-bold">
                      {race.id} · {race.label}
                    </div>
                    <div className="text-xs text-textMuted">
                      Race {race.raceNo} · {race.time}
                    </div>
                  </div>
                </div>
                <StatusBadge status={STATUS_MAP[race.status]} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

import { Check, Clock } from 'lucide-react';
import type { Race } from '../../types/betting';
import { useCountdown } from '../../hooks/useCountdown';
import { cn } from '../../utils/cn';

interface ChipProps {
  race: Race;
  active: boolean;
  onClick: () => void;
}

function RaceChip({ race, active, onClick }: ChipProps) {
  const countdown = useCountdown(race.closesAt);

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 rounded-xl px-4 py-3 text-left transition-colors lg:flex-none lg:min-w-[160px]',
        active ? 'bg-primary text-primaryText' : 'bg-surfaceAlt text-textPrimary hover:bg-surface',
      )}
    >
      <div className="text-sm font-bold">
        {race.id} <span className="font-normal opacity-70">· {race.time}</span>
      </div>
      <div
        className={cn(
          'mt-1 flex items-center gap-1.5 text-xs font-bold',
          active ? 'text-primaryText/80' : race.status === 'finished' ? 'text-success' : race.status === 'live' ? 'text-danger' : 'text-textMuted',
        )}
      >
        {race.status === 'finished' && (
          <>
            <Check size={14} /> FINISHED
          </>
        )}
        {race.status === 'live' && (
          <>
            <span className="h-2 w-2 rounded-full bg-current" /> LIVE
          </>
        )}
        {race.status === 'upcoming' && (
          <>
            <Clock size={14} /> {countdown.label}
          </>
        )}
      </div>
    </button>
  );
}

interface Props {
  races: Race[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export default function RaceTabs({ races, activeId, onSelect, className }: Props) {
  return (
    <div className={cn('flex gap-3', className)}>
      {races.map((race) => (
        <RaceChip key={race.id} race={race} active={race.id === activeId} onClick={() => onSelect(race.id)} />
      ))}
    </div>
  );
}

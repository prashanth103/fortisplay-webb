import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';

type Status = 'finished' | 'live' | 'upcoming' | 'ended';

const CONFIG: Record<Status, { label: string; className: string; icon?: 'check' | 'dot' | 'clock' }> = {
  finished: { label: 'Finished', className: 'text-success', icon: 'check' },
  ended: { label: 'Ended', className: 'text-success', icon: 'dot' },
  live: { label: 'Live', className: 'text-danger', icon: 'dot' },
  upcoming: { label: 'Upcoming', className: 'text-textMuted', icon: 'dot' },
};

export default function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const cfg = CONFIG[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 uppercase', typographyClasses.labelMedium, cfg.className, className)}>
      {cfg.icon === 'check' && <CheckCircle2 size={14} />}
      {cfg.icon === 'clock' && <Clock size={14} />}
      {cfg.icon === 'dot' && <Circle size={8} className="fill-current" />}
      {cfg.label}
    </span>
  );
}

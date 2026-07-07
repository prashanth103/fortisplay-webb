import { ENTRY_COLORS } from '../../constants/theme';
import { cn } from '../../utils/cn';

interface Props {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-11 w-11 text-xs',
  lg: 'h-14 w-14 text-sm',
};

export default function ColorBadge({ code, size = 'md', className }: Props) {
  const entry = ENTRY_COLORS[code];
  if (!entry) return null;

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border-2 border-white/10 font-bold',
        SIZES[size],
        entry.dark ? 'text-black/70' : 'text-white',
        className,
      )}
      style={{ backgroundColor: entry.hex }}
    >
      {code}
    </div>
  );
}

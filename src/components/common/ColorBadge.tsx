import { ENTRY_COLORS, type EntryColorCode } from '../../constants/theme';
import { compactTypographyClasses, typographyClasses } from '../../constants/typography';
import { cn } from '../../utils/cn';

interface Props {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: {
    outer: 'h-8 w-8',
    inner: 'h-5 w-5',
    text: compactTypographyClasses.badgeSmall,
  },
  md: {
    outer: 'h-12 w-12',
    inner: 'h-8 w-8',
    text: compactTypographyClasses.badgeMedium,
  },
  lg: {
    outer: 'h-14 w-14',
    inner: 'h-10 w-10',
    text: typographyClasses.titleSmall,
  },
};

function isEntryColorCode(code: string): code is EntryColorCode {
  return code in ENTRY_COLORS;
}

export default function ColorBadge({
  code,
  size = 'md',
  className,
}: Props) {
  if (!isEntryColorCode(code)) return null;

  const entry = ENTRY_COLORS[code];

  const s = SIZES[size];

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.45)]',
        s.outer,
        className,
      )}
      style={{
        background: `radial-gradient(circle at 28% 28%, ${entry.light} 0%, ${entry.base} 72%, ${entry.base} 100%)`,
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]',
          s.inner,
          s.text,
          'dark' in entry && entry.dark ? 'text-neutral-700' : 'text-neutral-900',
        )}
      >
        {code}
      </div>
    </div>
  );
}

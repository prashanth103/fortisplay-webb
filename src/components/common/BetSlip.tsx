import { FileText, X } from 'lucide-react';
import ColorBadge from './ColorBadge';
import type { Entry } from '../../types/betting';
import { POOLS, type PoolKey } from '../../constants/theme';
import { typographyClasses, typographyLetterSpacing, typographyStyles } from '../../constants/typography';

interface Props {
  pool: PoolKey;
  entries: Entry[];
  stake: number;
  onStakeChange: (value: number) => void;
  onPlaceBet: () => void;
  onClose?: () => void;
  isMobileDock?: boolean;
}

export function BetSlipBadge({ count }: { count: number }) {
  return (
    <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primaryText ${typographyClasses.labelMedium}`}>
      {count}
    </span>
  );
}

export default function BetSlip({ pool, entries, stake, onStakeChange, onPlaceBet, onClose, isMobileDock = false }: Props) {
  const poolMeta = POOLS.find((p) => p.key === pool)!;
  const complete = entries.length === poolMeta.picks;

  return (
    <div
      style={{
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: isMobileDock ? 0 : 18,
        borderBottomRightRadius: isMobileDock ? 0 : 18,
        overflow: 'hidden',
        boxShadow: isMobileDock
          ? '0 -4px 20px 2px rgba(242,185,62,0.18), 0 -8px 32px rgba(0,0,0,0.45)'
          : '0 0 24px 2px rgba(242,185,62,0.18), 0 8px 32px rgba(0,0,0,0.45)',
      }}
    >
      <div
        style={{
          background: '#1B1B1B',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <FileText size={16} color="#9CA3AF" />
          </span>
          <span style={{ ...typographyStyles.titleSmall, color: '#FFFFFF' }}>
            Bet Slip
          </span>
          <BetSlipBadge count={entries.length} />
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="#9CA3AF" />
          </button>
        )}
      </div>

      <div
        style={{
          background: '#FFFFFF',
          padding: '0 16px 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0 10px',
          }}
        >
          <span
            style={{
              ...typographyStyles.labelSmall,
              letterSpacing: typographyLetterSpacing.compactLabel,
              textTransform: 'uppercase' as const,
              color: '#D89A1F',
            }}
          >
            {poolMeta.label} · {poolMeta.sub}
          </span>
          <span
            style={{
              ...typographyStyles.labelSmall,
              letterSpacing: typographyLetterSpacing.compactLabel,
              textTransform: 'uppercase' as const,
              color: '#B0A58A',
            }}
          >
            Stake
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entries.map((entry) => (
            <div
              key={entry.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ColorBadge code={entry.code} size="sm" />
                <span style={{ ...typographyStyles.titleSmall, color: '#1A1500' }}>
                  {entry.name}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 40,
                  width: 96,
                  borderRadius: 10,
                  border: '2px solid #F2B93E',
                  background: '#FFF9EB',
                  paddingLeft: 12,
                  paddingRight: 12,
                  flexShrink: 0,
                }}
              >
                <span style={{ ...typographyStyles.labelLarge, color: '#B0A58A' }}>₱</span>
                <input
                  type="number"
                  min={1}
                  value={stake}
                  onChange={(e) => onStakeChange(Number(e.target.value) || 0)}
                  style={{
                    ...typographyStyles.titleSmall,
                    width: '100%',
                    background: 'transparent',
                    textAlign: 'right' as const,
                    color: '#1A1500',
                    outline: 'none',
                    border: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={!complete || stake <= 0}
          onClick={onPlaceBet}
          style={{
            ...typographyStyles.titleSmall,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 48,
            marginTop: 16,
            borderRadius: 12,
            border: 'none',
            background: !complete || stake <= 0 ? '#E8D5A0' : '#F2B93E',
            color: '#1A1500',
            cursor: !complete || stake <= 0 ? 'not-allowed' : 'pointer',
            opacity: !complete || stake <= 0 ? 0.5 : 1,
            fontFamily: 'inherit',
            transition: 'background 0.15s ease',
          }}
        >
          Place Bet · ₱{stake}
        </button>
      </div>
    </div>
  );
}

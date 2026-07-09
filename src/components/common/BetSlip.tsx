import { FileText, X } from 'lucide-react';
import ColorBadge from './ColorBadge';
import type { Entry } from '../../types/betting';
import { POOLS, type PoolKey } from '../../constants/theme';

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
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primaryText">
      {count}
    </span>
  );
}

export default function BetSlip({ pool, entries, stake, onStakeChange, onPlaceBet, onClose, isMobileDock = false }: Props) {
  const poolMeta = POOLS.find((p) => p.key === pool)!;
  const complete = entries.length === poolMeta.picks;

  return (
    /* Outer wrapper — floating card with yellow glow shadow */
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
      {/* ─── 1. Dark Header ─── */}
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
          {/* Icon in small rounded square */}
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
          {/* Title */}
          <span style={{ fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
            Bet Slip
          </span>
          {/* Badge */}
          <BetSlipBadge count={entries.length} />
        </div>

        {/* Close button */}
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

      {/* ─── 2. White Content Container ─── */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '0 16px 16px',
        }}
      >
        {/* Pool label + STAKE */}
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
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#D89A1F',
            }}
          >
            {poolMeta.label} · {poolMeta.sub}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#B0A58A',
            }}
          >
            Stake
          </span>
        </div>

        {/* Entry rows */}
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
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1500' }}>
                  {entry.name}
                </span>
              </div>

              {/* Stake input — yellow border */}
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
                <span style={{ color: '#B0A58A', fontSize: 14, fontWeight: 600 }}>₱</span>
                <input
                  type="number"
                  min={1}
                  value={stake}
                  onChange={(e) => onStakeChange(Number(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    textAlign: 'right' as const,
                    fontSize: 14,
                    fontWeight: 700,
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

        {/* Place Bet button — inside white container */}
        <button
          disabled={!complete || stake <= 0}
          onClick={onPlaceBet}
          style={{
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
            fontSize: 14,
            fontWeight: 700,
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

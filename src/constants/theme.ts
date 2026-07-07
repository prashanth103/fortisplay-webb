// Single source of truth for design tokens.
// (Previously split across colors.ts + theme.ts — consolidated here.)

export const COLORS = {
  primary: '#F2B93E',
  primaryDark: '#D89A1F',
  primaryText: '#1A1500',

  background: '#0B0B0D',
  surface: '#141416',
  surfaceAlt: '#1C1C1F',
  surfaceLight: '#FFFFFF',
  border: '#2A2A2E',

  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textOnLight: '#0B0B0D',

  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F2B93E',
  info: '#3FA9F5',
};

// Colored "entry" badges used for race participants (color-coded balls).
export const ENTRY_COLORS: Record<string, { hex: string; name: string; dark?: boolean }> = {
  YW: { hex: '#F2C230', name: 'Yellow', dark: true },
  LG: { hex: '#3FAE4A', name: 'Light Green' },
  OR: { hex: '#E8792B', name: 'Orange' },
  RD: { hex: '#E1393B', name: 'Red' },
  VT: { hex: '#8E3FD1', name: 'Violet' },
  PK: { hex: '#EC7FB2', name: 'Pink' },
  IV: { hex: '#E7DFC6', name: 'Ivory', dark: true },
  SB: { hex: '#5AB9E8', name: 'Sky Blue' },
  SV: { hex: '#C9CDD1', name: 'Silver', dark: true },
};

export type PoolKey = 'WIN' | 'FORECAST' | 'TRIFECTA' | 'QUARTET';

export const POOLS: { key: PoolKey; label: string; sub: string; picks: number }[] = [
  { key: 'WIN', label: 'WIN', sub: 'Finish 1st', picks: 1 },
  { key: 'FORECAST', label: 'Forecast', sub: 'Top 2', picks: 2 },
  { key: 'TRIFECTA', label: 'Trifecta', sub: 'Top 3', picks: 3 },
  { key: 'QUARTET', label: 'Quartet', sub: 'Top 4', picks: 4 },
];

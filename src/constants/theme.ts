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

export const THEME_COLORS = {
  dark: COLORS,
  light: {
    ...COLORS,
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F2F5',
    surfaceLight: '#FFFFFF',
    border: '#DDE1E7',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#7A828F',
    textOnLight: '#111827',
    cardIconBg: '#FFF2C8',
    cardIcon: '#B77900',
  },
} as const;

// Colored "entry" badges used for race participants (color-coded balls).
export const ENTRY_COLORS = {
  YW: {
    base: '#F0C419',
    light: '#FFD94D',
    name: 'Yellow',
    dark: true,
  },
  LG: {
    base: '#5AAE34',
    light: '#8EDB60',
    name: 'Light Green',
  },
  OR: {
    base: '#E46A22',
    light: '#FFA160',
    name: 'Orange',
  },
  RD: {
    base: '#D72626',
    light: '#FF6464',
    name: 'Red',
  },
  VT: {
    base: '#8B2BB9',
    light: '#BF6EF2',
    name: 'Violet',
  },
  PK: {
    base: '#E57DB4',
    light: '#F9BDD8',
    name: 'Pink',
  },
  IV: {
    base: '#DDD3B6',
    light: '#F6F1E5',
    name: 'Ivory',
    dark: true,
  },
  SB: {
    base: '#63B6E8',
    light: '#B6E4FF',
    name: 'Sky Blue',
  },
  SV: {
    base: '#B9BDC2',
    light: '#EEF1F5',
    name: 'Silver',
    dark: true,
  },
};

export type EntryColorCode = keyof typeof ENTRY_COLORS;

export type PoolKey = 'WIN' | 'FORECAST' | 'TRIFECTA' | 'QUARTET';

export const POOLS: { key: PoolKey; label: string; sub: string; picks: number }[] = [
  { key: 'WIN', label: 'WIN', sub: 'Finish 1st', picks: 1 },
  { key: 'FORECAST', label: 'Forecast', sub: 'Top 2', picks: 2 },
  { key: 'TRIFECTA', label: 'Trifecta', sub: 'Top 3', picks: 3 },
  { key: 'QUARTET', label: 'Quartet', sub: 'Top 4', picks: 4 },
];

import type { CSSProperties } from 'react';

export const TYPOGRAPHY_VARIANTS = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
] as const;

export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];

export type TypographyToken = {
  fontSize: string;
  fontWeight: CSSProperties['fontWeight'];
  lineHeight: string;
  letterSpacing?: string;
};

export const typography: Record<TypographyVariant, TypographyToken> = {
  displayLarge: { fontSize: '36px', fontWeight: 700, lineHeight: '44px' },
  displayMedium: { fontSize: '30px', fontWeight: 700, lineHeight: '38px' },
  displaySmall: { fontSize: '24px', fontWeight: 700, lineHeight: '32px' },
  headlineLarge: { fontSize: '24px', fontWeight: 700, lineHeight: '32px' },
  headlineMedium: { fontSize: '20px', fontWeight: 700, lineHeight: '28px' },
  headlineSmall: { fontSize: '18px', fontWeight: 700, lineHeight: '24px' },
  titleLarge: { fontSize: '18px', fontWeight: 700, lineHeight: '24px' },
  titleMedium: { fontSize: '16px', fontWeight: 700, lineHeight: '24px' },
  titleSmall: { fontSize: '14px', fontWeight: 700, lineHeight: '20px' },
  bodyLarge: { fontSize: '16px', fontWeight: 400, lineHeight: '24px' },
  bodyMedium: { fontSize: '14px', fontWeight: 400, lineHeight: '20px' },
  bodySmall: { fontSize: '12px', fontWeight: 400, lineHeight: '16px' },
  labelLarge: { fontSize: '14px', fontWeight: 600, lineHeight: '20px' },
  labelMedium: { fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.025em' },
  labelSmall: { fontSize: '10px', fontWeight: 700, lineHeight: '14px', letterSpacing: '0.025em' },
};

export const typographyClasses: Record<TypographyVariant, string> = {
  displayLarge: 'text-4xl font-bold leading-[44px]',
  displayMedium: 'text-3xl font-bold leading-[38px]',
  displaySmall: 'text-2xl font-bold leading-8',
  headlineLarge: 'text-2xl font-bold leading-8',
  headlineMedium: 'text-xl font-bold leading-7',
  headlineSmall: 'text-lg font-bold leading-6',
  titleLarge: 'text-lg font-bold leading-6',
  titleMedium: 'text-base font-bold leading-6',
  titleSmall: 'text-sm font-bold leading-5',
  bodyLarge: 'text-base font-normal leading-6',
  bodyMedium: 'text-sm font-normal leading-5',
  bodySmall: 'text-xs font-normal leading-4',
  labelLarge: 'text-sm font-semibold leading-5',
  labelMedium: 'text-xs font-bold leading-4 tracking-wide',
  labelSmall: 'text-[10px] font-bold leading-[14px] tracking-wide',
};

export const compactTypographyClasses = {
  badgeSmall: 'text-[8px] font-black leading-none',
  badgeMedium: 'text-[11px] font-black leading-none',
} as const;

export const typographyLetterSpacing = {
  compactLabel: '0.08em',
} as const;

export const typographyStyles: Record<TypographyVariant, CSSProperties> = typography;

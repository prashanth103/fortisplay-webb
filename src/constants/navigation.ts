import type { LucideIcon } from 'lucide-react';
import { Home, Eye, TrendingUp, Banknote, Wallet } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAVIGATION: NavItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Watch', path: '/watch', icon: Eye },
  { label: 'Sales', path: '/sales', icon: TrendingUp },
  { label: 'Payouts', path: '/payouts', icon: Banknote },
  { label: 'Wallet', path: '/wallet', icon: Wallet },
];

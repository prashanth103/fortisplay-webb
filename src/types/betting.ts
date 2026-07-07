import type { PoolKey } from '../constants/theme';

export type RaceStatus = 'finished' | 'live' | 'upcoming';

export interface Entry {
  code: string; // e.g. "YW"
  name: string; // e.g. "Yellow"
}

export interface RaceResult {
  pool: PoolKey;
  order: string[]; // entry codes in finishing order
}

export interface Race {
  id: string; // e.g. "KB1"
  label: string; // e.g. "Karambola"
  time: string; // e.g. "19:35"
  raceNo: number;
  status: RaceStatus;
  closesAt?: number; // epoch ms, used for the countdown when upcoming
  results?: RaceResult[]; // present when status === 'finished'
}

export interface Selection {
  entryCode: string;
  position: number; // 1-based position within the pool pick
}

export interface Ticket {
  id: string;
  raceId: string;
  pool: PoolKey;
  order: 'EXACT' | 'ANY';
  variant: string;
  entries: string[]; // entry codes selected, in order
  amount: number;
  createdAt: number;
}

export interface Transaction {
  id: string;
  raceId: string;
  pool: PoolKey;
  order: 'EXACT' | 'ANY';
  entryCode: string;
  amount: number;
  time: string;
}

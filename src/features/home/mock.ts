import type { Entry, Race } from '../../types/betting';

export const ENTRIES: Entry[] = [
  { code: 'YW', name: 'Yellow' },
  { code: 'LG', name: 'Light Green' },
  { code: 'OR', name: 'Orange' },
  { code: 'RD', name: 'Red' },
  { code: 'VT', name: 'Violet' },
  { code: 'PK', name: 'Pink' },
  { code: 'IV', name: 'Ivory' },
  { code: 'SB', name: 'Sky Blue' },
];

const now = Date.now();

export const RACES: Race[] = [
  {
    id: 'KB1',
    label: 'Karambola',
    time: '19:35',
    raceNo: 8,
    status: 'finished',
    results: [
      { pool: 'WIN', order: ['SB'] },
      { pool: 'FORECAST', order: ['SB', 'LG'] },
      { pool: 'TRIFECTA', order: ['SB', 'LG', 'SV'] },
      { pool: 'QUARTET', order: ['SB', 'LG', 'SV', 'OR'] },
    ],
  },
  {
    id: 'KB2',
    label: 'Karambola',
    time: '19:50',
    raceNo: 8,
    status: 'live',
  },
  {
    id: 'KB3',
    label: 'Karambola',
    time: '20:05',
    raceNo: 8,
    status: 'upcoming',
    closesAt: now + 1000 * 60 * 87 + 1000 * 32, // ~01:27:32 from load
  },
];

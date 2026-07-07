import type { Transaction } from '../../types/betting';

export const TRANSACTIONS: Transaction[] = [
  { id: '8266I50525', raceId: 'KB2', pool: 'WIN', order: 'EXACT', entryCode: 'YW', amount: 5, time: '4:32:18 PM' },
  { id: '8261k44213', raceId: 'KB1', pool: 'FORECAST', order: 'ANY', entryCode: 'SB', amount: 10, time: '4:18:46 PM' },
  { id: '8259j81740', raceId: 'KB1', pool: 'WIN', order: 'EXACT', entryCode: 'LG', amount: 5, time: '4:05:09 PM' },
  { id: '8254h22906', raceId: 'KB2', pool: 'TRIFECTA', order: 'ANY', entryCode: 'OR', amount: 20, time: '3:52:31 PM' },
  { id: '8248g13558', raceId: 'KB1', pool: 'QUARTET', order: 'EXACT', entryCode: 'SV', amount: 15, time: '3:40:55 PM' },
  { id: '8242f90817', raceId: 'KB3', pool: 'WIN', order: 'EXACT', entryCode: 'RD', amount: 5, time: '3:25:12 PM' },
  { id: '8239e10237', raceId: 'KB3', pool: 'WIN', order: 'EXACT', entryCode: 'VT', amount: 10, time: '3:10:02 PM' },
];

export const SALES_SUMMARY = {
  totalSales: TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0),
  ticketCount: TRANSACTIONS.length,
};

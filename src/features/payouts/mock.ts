export type PayoutStatus = 'won' | 'lost' | 'pending';

export interface PayoutTicket {
  id: string;
  raceId: string;
  pool: string;
  entryCode: string;
  amount: number;
  payout: number;
  status: PayoutStatus;
  date: string;
}

// Ticket numbers that exist in the "system" for demo purposes.
export const KNOWN_TICKETS: PayoutTicket[] = [
  { id: '8266I50525', raceId: 'KB2', pool: 'WIN', entryCode: 'YW', amount: 5, payout: 75, status: 'won', date: '21-06-2026, 4:32 PM' },
  { id: '8259j81740', raceId: 'KB1', pool: 'WIN', entryCode: 'LG', amount: 5, payout: 0, status: 'lost', date: '21-06-2026, 4:05 PM' },
  { id: '8242f90817', raceId: 'KB3', pool: 'WIN', entryCode: 'RD', amount: 5, payout: 0, status: 'pending', date: '21-06-2026, 3:25 PM' },
  { id: '8248g13558', raceId: 'KB1', pool: 'QUARTET', entryCode: 'SV', amount: 15, payout: 420, status: 'won', date: '21-06-2026, 3:40 PM' },
];

export function findTicket(ticketNo: string): PayoutTicket | undefined {
  const clean = ticketNo.trim();
  return KNOWN_TICKETS.find((t) => t.id.toLowerCase() === clean.toLowerCase());
}

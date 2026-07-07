export interface WalletTransaction {
  id: string;
  type: 'received' | 'remitted';
  method: string;
  time: string;
  amount: number;
}

export const WALLET_SUMMARY = {
  totalSales: 400,
  commission: 40,
  received: 0,
  remitted: 100,
  cancelled: 0,
  payouts: 0,
};

export const WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: 'w1', type: 'received', method: 'Cash', time: '17:22:08', amount: 500 },
  { id: 'w2', type: 'remitted', method: 'Cash', time: '16:05:41', amount: 100 },
];

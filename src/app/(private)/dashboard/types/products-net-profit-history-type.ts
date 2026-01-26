export type ProductNetProfitHistoryType = {
  productId: string;
  productName: string;
  dailyHistory?: [
    {
      date: string;
      changedAt: string;
      netProfit: number;
    },
  ];
};

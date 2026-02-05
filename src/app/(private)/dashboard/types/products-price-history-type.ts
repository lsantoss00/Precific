export type ProductsPriceHistoryType = {
  productId: string;
  productName: string;
  dailyHistory?: [
    {
      date: string;
      changedAt: string;
      priceIn2026: number;
    },
  ];
};

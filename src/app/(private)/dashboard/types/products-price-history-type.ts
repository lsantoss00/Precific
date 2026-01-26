export type ProductsPriceHistoryType = {
  productId: string;
  productName: string;
  dailyHistory?: [
    {
      date: string;
      changedAt: string;
      priceToday: number;
    },
  ];
};

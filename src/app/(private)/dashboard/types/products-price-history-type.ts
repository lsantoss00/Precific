export type ProductPriceHistoryType = {
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

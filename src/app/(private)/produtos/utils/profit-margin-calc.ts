interface ProfitMarginCalc {
  liquidProfit: number;
  priceToday: number;
}

export function profitMarginCalc({
  liquidProfit,
  priceToday,
}: ProfitMarginCalc): number {
  const result = liquidProfit / priceToday;

  return Number(result);
}

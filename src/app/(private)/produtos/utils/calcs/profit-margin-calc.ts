interface ProfitMarginCalc {
  liquidProfit: number;
  suggestedProductPrice: number;
}

export function profitMarginCalc({
  liquidProfit,
  suggestedProductPrice,
}: ProfitMarginCalc): number {
  const result = liquidProfit / suggestedProductPrice;

  return result;
}

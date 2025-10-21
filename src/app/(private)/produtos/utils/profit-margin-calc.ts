interface ProfitMarginCalc {
  acquisitionCost: number;
  profit: number;
}

export function profitMarginCalc({
  acquisitionCost,
  profit,
}: ProfitMarginCalc): number {
  const result = ((acquisitionCost * profit) / 100).toFixed(2);

  return Number(result);
}

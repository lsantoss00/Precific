interface NetProfitMarginCalc {
  profit: number;
  fixedCosts: number;
  shipping: number;
  otherCosts: number;
}

export function netProfitCalc({
  profit,
  fixedCosts,
  shipping,
  otherCosts,
}: NetProfitMarginCalc): number {
  const result = profit - fixedCosts - shipping - otherCosts;

  return Number(result);
}

interface PricingCalcProps {
  priceToday: number;
  ibsRate: number;
  cbsRate: number;
}

export function pricingCalc({
  priceToday,
  ibsRate,
  cbsRate,
}: PricingCalcProps): number {
  const value = ibsRate / cbsRate;
  const total = priceToday + (value * ibsRate + value * cbsRate);

  return total;
}

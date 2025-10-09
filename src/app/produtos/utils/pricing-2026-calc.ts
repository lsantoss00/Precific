interface Pricing2026CalcProps {
  priceToday: number;
  ibsRate: number;
  cbsRate: number;
}

export function pricing2026Calc({
  priceToday,
  ibsRate,
  cbsRate,
}: Pricing2026CalcProps): number {
  const value = ibsRate / cbsRate;
  const total = priceToday + (value * ibsRate + value * cbsRate);

  return total;
}

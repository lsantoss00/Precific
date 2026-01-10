interface Pricing2026CalcProps {
  suggestedProductPrice: number;
  ibsRate: number;
  cbsRate: number;
}

export function pricing2026Calc({
  suggestedProductPrice,
  ibsRate,
  cbsRate,
}: Pricing2026CalcProps): number {
  const value = ibsRate / cbsRate;
  const result = suggestedProductPrice + (value * ibsRate + value * cbsRate);

  return result;
}

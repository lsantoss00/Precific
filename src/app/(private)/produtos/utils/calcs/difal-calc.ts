interface DifalCalcProps {
  priceToday: number;
  internalTaxRate: number;
  interstateTaxRate: number;
}

export function difalCalc({
  priceToday,
  internalTaxRate,
  interstateTaxRate,
}: DifalCalcProps): number {
  const result = priceToday * ((internalTaxRate - interstateTaxRate) / 100);

  return result;
}

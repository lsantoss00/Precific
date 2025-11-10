interface DifalCalcProps {
  priceToday: number;
  originTaxRate: number;
  destinationTaxRate: number;
}

export function difalCalc({
  priceToday,
  originTaxRate,
  destinationTaxRate,
}: DifalCalcProps): number {
  const result = priceToday * ((destinationTaxRate - originTaxRate) / 100);

  return result;
}

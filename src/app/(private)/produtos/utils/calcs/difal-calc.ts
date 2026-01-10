interface DifalCalcProps {
  suggestedProductPrice: number;
  internalTaxRate: number;
  interstateTaxRate: number;
}

export function difalCalc({
  suggestedProductPrice,
  internalTaxRate,
  interstateTaxRate,
}: DifalCalcProps): number {
  const result =
    suggestedProductPrice * ((internalTaxRate - interstateTaxRate) / 100);

  return result;
}

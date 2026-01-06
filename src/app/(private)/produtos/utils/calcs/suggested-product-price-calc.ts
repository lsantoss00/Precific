interface SuggestedProductPriceCalcProps {
  acquisitionCost: number;
  markup: number;
}

export function suggestedProductPriceCalc({
  acquisitionCost,
  markup,
}: SuggestedProductPriceCalcProps): number {
  const result = (acquisitionCost / markup) * 100;

  return result;
}

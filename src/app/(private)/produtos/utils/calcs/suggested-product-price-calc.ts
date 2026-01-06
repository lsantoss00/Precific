interface SuggestedProductPriceCalcProps {
  acquisitionCost: number;
  markup: number;
}

export function suggestedProductPriceCalc({
  acquisitionCost,
  markup,
}: SuggestedProductPriceCalcProps): number {
  return (acquisitionCost / markup) * 100;
}

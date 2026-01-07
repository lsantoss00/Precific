interface SuggestedProductPriceCalcProps {
  acquisitionCost: number;
  markup: number;
}

export function suggestedProductPriceCalc({
  acquisitionCost,
  markup,
}: SuggestedProductPriceCalcProps): number {
  console.log("acquisitionCost", acquisitionCost);
  console.log("markup", markup);

  const result = (acquisitionCost / markup) * 100;

  return result;
}

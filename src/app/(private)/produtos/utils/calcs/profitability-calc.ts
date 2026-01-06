interface ProfitabilityCalcProps {
  netProfit: number;
  suggestedProductPrice: number;
}

export function ProfitabilityCalc({
  netProfit,
  suggestedProductPrice,
}: ProfitabilityCalcProps) {
  const result = (netProfit / suggestedProductPrice) * 100;

  return result;
}

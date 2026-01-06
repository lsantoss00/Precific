interface ProfitabilityCalcProps {
  netProfit: number;
  suggestedProductPrice: number;
}

export function ProfitabilityCalc({
  netProfit,
  suggestedProductPrice,
}: ProfitabilityCalcProps) {
  const result = netProfit / suggestedProductPrice;

  return Math.round(result * 100);
}

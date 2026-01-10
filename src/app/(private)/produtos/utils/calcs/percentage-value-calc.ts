interface PercentageValueCalcProps {
  base: number;
  percentage: number;
}

export function percentageValueCalc({
  base,
  percentage,
}: PercentageValueCalcProps): number {
  const result = base * (percentage / 100);

  return result;
}

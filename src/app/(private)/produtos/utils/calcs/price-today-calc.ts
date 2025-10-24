interface PriceTodayCalcProps {
  firstBase: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function priceTodayCalc({
  firstBase,
  salesIcms,
  salesPisCofins,
}: PriceTodayCalcProps): number {
  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;

  const denominator = 1 - salesIcmsPercent - salesPisCofinsPercent;

  const result = firstBase / denominator;

  return result;
}

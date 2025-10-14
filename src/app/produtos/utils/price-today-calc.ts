interface PriceTodayCalcProps {
  acquisitionCost: number;
  fixedCosts: number;
  shipping: number;
  othersCost: number;
  profit: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function priceTodayCalc({
  acquisitionCost,
  fixedCosts,
  shipping,
  othersCost,
  profit,
  salesIcms,
  salesPisCofins,
}: PriceTodayCalcProps) {
  const percentSum = (fixedCosts + shipping + othersCost + profit) / 100;

  const value = acquisitionCost + acquisitionCost * percentSum;

  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;

  const denominator = 1 - salesIcmsPercent - salesPisCofinsPercent; // GABRIELA MANDOU TIRAR: * (1 - salesIcmsPercent)

  const priceToday = value / denominator;

  const result = priceToday.toFixed(2);

  return {
    result: Number(result),
    value: Number(value),
  };
}

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
  const percentSum = (fixedCosts + shipping + othersCost) / 100;

  const value = acquisitionCost + acquisitionCost * percentSum;

  const base1 = value + value * (profit / 100);

  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;

  const denominator = 1 - salesIcmsPercent - salesPisCofinsPercent; // GABRIELLA MANDOU TIRAR: * (1 - salesIcmsPercent)

  const priceToday = base1 / denominator;

  const result = priceToday.toFixed(2);

  return {
    result: Number(result),
    value: Number(value),
    base1: Number(base1),
  };
}

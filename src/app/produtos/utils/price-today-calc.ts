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
}: PriceTodayCalcProps): number {
  const value =
    acquisitionCost +
    acquisitionCost * (fixedCosts + shipping + othersCost + profit);

  const priceToday = value / (1 - salesIcms - salesPisCofins * (1 - salesIcms));

  return priceToday;
}

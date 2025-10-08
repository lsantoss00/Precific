interface PriceTodayCalcProps {
  finalAcquisitionValue: number;
  fixedCosts: number;
  shipping: number;
  othersCost: number;
  profit: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function priceTodayCalc({
  finalAcquisitionValue,
  fixedCosts,
  shipping,
  othersCost,
  profit,
  salesIcms,
  salesPisCofins,
}: PriceTodayCalcProps): number {
  const value =
    finalAcquisitionValue +
    finalAcquisitionValue * (fixedCosts + shipping + othersCost + profit);

  const priceToday = value / (1 - salesIcms - salesPisCofins * (1 - salesIcms));

  return priceToday;
}

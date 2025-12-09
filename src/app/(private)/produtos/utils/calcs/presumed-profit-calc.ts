interface PresumedProfitCalcProps {
  priceToday: number;
  unitPrice: number;
  icms: number;
  pisCofins: number;
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
  irpjCsll: number;
}

export function presumedProfitCalc({
  priceToday,
  unitPrice,
  icms,
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
  irpjCsll,
}: PresumedProfitCalcProps): number {
  const icmsRec = salesIcms === 0 ? 0 : salesIcms - icms;

  const result =
    priceToday -
    fixedCosts -
    icmsRec -
    salesPisCofins -
    shipping -
    othersCosts -
    unitPrice -
    irpjCsll;

  return result;
}

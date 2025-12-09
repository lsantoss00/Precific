interface RealProfitCalcProps {
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

export function realProfitCalc({
  priceToday,
  unitPrice,
  icms,
  pisCofins,
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
  irpjCsll,
}: RealProfitCalcProps): number {
  const icmsRec = salesIcms === 0 ? 0 : salesIcms - icms;

  const pisCofinsRec = salesPisCofins - pisCofins;

  const result =
    priceToday -
    unitPrice -
    fixedCosts -
    shipping -
    othersCosts -
    irpjCsll -
    icmsRec -
    pisCofinsRec;

  return result;
}

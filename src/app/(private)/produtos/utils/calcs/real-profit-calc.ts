interface RealProfitCalcProps {
  suggestedProductPrice: number;
  acquisitionCost: number;
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
  suggestedProductPrice,
  acquisitionCost,
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
  const icmsRecFinal = icmsRec < 0 ? 0 : icmsRec;

  const pisCofinsRec = salesPisCofins - pisCofins;
  const pisCofinsRecFinal = pisCofinsRec < 0 ? 0 : pisCofinsRec;

  const result =
    suggestedProductPrice -
    acquisitionCost -
    fixedCosts -
    shipping -
    othersCosts -
    irpjCsll -
    icmsRecFinal -
    pisCofinsRecFinal;

  return result;
}

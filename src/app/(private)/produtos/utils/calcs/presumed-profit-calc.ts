interface PresumedProfitCalcProps {
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

export function presumedProfitCalc({
  suggestedProductPrice,
  acquisitionCost,
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
    suggestedProductPrice -
    (fixedCosts +
      icmsRec +
      salesPisCofins +
      shipping +
      othersCosts +
      acquisitionCost +
      irpjCsll);

  return result;
}

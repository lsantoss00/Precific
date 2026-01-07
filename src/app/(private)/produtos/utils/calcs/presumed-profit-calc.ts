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

  console.log("suggestedProductPrice", suggestedProductPrice);
  console.log("acquisitionCost", acquisitionCost);
  console.log("icms", icms);
  console.log("fixedCosts", fixedCosts);
  console.log("salesIcms", salesIcms);
  console.log("salesPisCofins", salesPisCofins);
  console.log("shipping", shipping);
  console.log("othersCosts", othersCosts);
  console.log("irpjCsll", irpjCsll);
  console.log("icmsRec", icmsRec);

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

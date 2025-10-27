interface LiquidProfitCalcProps {
  priceToday: number;
  unitPrice: number;
  icms: number;
  pisCofins: number;
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
  irpjCsllPercent: 24 | 34;
  taxRegime?: "realProfit" | "presumedProfit" | "simpleNational";
}

export function liquidProfitCalc({
  priceToday,
  unitPrice,
  icms,
  pisCofins,
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
  irpjCsllPercent,
}: LiquidProfitCalcProps): number {
  const bcIrpjCsll =
    priceToday -
    unitPrice -
    fixedCosts -
    salesIcms -
    salesPisCofins -
    shipping -
    othersCosts;

  const irpjCsll = bcIrpjCsll * (irpjCsllPercent / 100);

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

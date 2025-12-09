import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";

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
  irpjCsllPercent: number;
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
  irpjCsllPercent,
}: RealProfitCalcProps): number {
  const bcIrpjCsll =
    priceToday -
    unitPrice -
    fixedCosts -
    salesIcms -
    salesPisCofins -
    shipping -
    othersCosts;

  const irpjCsll =
    bcIrpjCsll < 0
      ? 0
      : percentageValueCalc({
          base: bcIrpjCsll,
          percentage: irpjCsllPercent,
        });

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

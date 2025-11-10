import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";

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
  irpjPercent: 0.15 | 0.25;
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
  irpjPercent,
}: PresumedProfitCalcProps): number {
  const calcBaseIrpj = percentageValueCalc({
    base: priceToday,
    percentage: 8,
  });

  const calcBaseCsll = percentageValueCalc({
    base: priceToday,
    percentage: 12,
  });

  const irpj = calcBaseIrpj * irpjPercent;
  const csll = calcBaseCsll * 0.09;

  const icmsRec = salesIcms === 0 ? 0 : salesIcms - icms;

  const result =
    priceToday -
    fixedCosts -
    icmsRec -
    salesPisCofins -
    shipping -
    othersCosts -
    unitPrice -
    irpj -
    csll;

  return result;
}

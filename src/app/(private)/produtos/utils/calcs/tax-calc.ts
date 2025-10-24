import { percentageValueCalc } from "./percentage-value-calc";

interface TaxCalcProps {
  priceToday: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function taxCalc({
  priceToday,
  salesIcms,
  salesPisCofins,
}: TaxCalcProps): number {
  const salesIcmsValue = percentageValueCalc({
    base: priceToday,
    percentage: salesIcms,
  });

  const baseForPisCofins = priceToday - salesIcmsValue;

  const salesPisCofinsValue = percentageValueCalc({
    base: baseForPisCofins,
    percentage: salesPisCofins,
  });

  const result = salesIcmsValue + salesPisCofinsValue;

  console.log("result", result);

  return result;
}

import { percentageValueCalc } from "./percentage-value-calc";

interface TaxCalcProps {
  suggestedProductPrice: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function taxCalc({
  suggestedProductPrice,
  salesIcms,
  salesPisCofins,
}: TaxCalcProps): number {
  const salesIcmsValue = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: salesIcms,
  });

  const baseForPisCofins = suggestedProductPrice - salesIcmsValue;

  const salesPisCofinsValue = percentageValueCalc({
    base: baseForPisCofins,
    percentage: salesPisCofins,
  });

  const result = salesIcmsValue + salesPisCofinsValue;

  return result;
}

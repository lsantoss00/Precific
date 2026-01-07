import { RevenueRangeType } from "@/src/app/(private)/perfil/types/company-type";

interface SimpleNationalCalcProps {
  suggestedProductPrice: number;
  acquisitionCost: number;
  icms: number;
  pisCofins: number;
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
  range: RevenueRangeType;
  das: number;
}

export function simpleNationalCalc({
  suggestedProductPrice,
  acquisitionCost,
  icms,
  fixedCosts,
  salesIcms,
  shipping,
  othersCosts,
  range,
  das,
}: SimpleNationalCalcProps): number {
  const icmsRec =
    range === "range_6" ? (salesIcms === 0 ? 0 : salesIcms - icms) : 0;

  const result =
    suggestedProductPrice -
    (fixedCosts + icmsRec + shipping + othersCosts + acquisitionCost + das);

  return result;
}

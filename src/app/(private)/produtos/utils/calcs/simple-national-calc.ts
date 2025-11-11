import { RevenueRangeType } from "@/src/app/(private)/perfil/types/company-type";

interface SimpleNationalCalcProps {
  priceToday: number;
  unitPrice: number;
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
  priceToday,
  unitPrice,
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
    priceToday -
    fixedCosts -
    icmsRec -
    shipping -
    othersCosts -
    unitPrice -
    das;

  return result;
}

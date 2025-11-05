import {
  RevenueRangeType,
  SectorType,
} from "@/src/app/(private)/meu-perfil/types/company-type";
import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";
import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";

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
  sector: SectorType;
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
  sector,
}: SimpleNationalCalcProps): number {
  const business = sector === "business";

  const revenueRangeData = getRevenueRangeDataPercentage({ business });

  const das = percentageValueCalc({
    base: priceToday ?? 0,
    percentage: revenueRangeData[range],
  });

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

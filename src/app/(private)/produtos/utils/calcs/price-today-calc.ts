import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";

interface PriceTodayCalcProps {
  firstBase: number;
  salesIcms: number;
  salesPisCofins: number;
  range?: "range-1" | "range-2" | "range-3" | "range-4" | "range-5" | "range-6";
  sector?: "business" | "industry";
  isSimpleNational?: boolean;
}

export function priceTodayCalc({
  firstBase,
  salesIcms,
  salesPisCofins,
  range,
  sector,
  isSimpleNational = false,
}: PriceTodayCalcProps): number {
  const icmsRate = salesIcms / 100;
  const pisCofinsRate = salesPisCofins / 100;

  if (isSimpleNational) {
    const revenueRangeData = getRevenueRangeDataPercentage({
      business: sector === "business",
    });

    const rangeRate = range ? revenueRangeData[range] / 100 : 0;
    const isHighestRange = range === "range-6";

    const denominator = 1 - (isHighestRange ? rangeRate + icmsRate : rangeRate);

    return firstBase / denominator;
  }

  const denominator = 1 - icmsRate - pisCofinsRate;
  return firstBase / denominator;
}

import { RevenueRangeType } from "@/src/app/(private)/perfil/types/company-type";
import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";

interface MarkupCalcProps {
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
  profit: number;
  range?: RevenueRangeType;
  business?: boolean;
  isSimpleNational?: boolean;
}

export function markupCalc({
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
  profit,
  range,
  business = false,
  isSimpleNational = false,
}: MarkupCalcProps): number {
  const fixedCostsPercent = fixedCosts / 100;
  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;
  const shippingPercent = shipping / 100;
  const othersCostsPercent = othersCosts / 100;
  const profitPercent = profit / 100;

  if (isSimpleNational) {
    const revenueRangeData = getRevenueRangeDataPercentage({
      business,
    });

    console.log("@fixedCostsPercent", fixedCostsPercent);
    console.log("@shippingPercent", shippingPercent);
    console.log("@othersCostsPercent", othersCostsPercent);
    console.log("@profitPercent", profitPercent);

    const rangeRatePercent = revenueRangeData[range!] / 100;
    console.log("@rangeRatePercent", rangeRatePercent);
    const isHighestRange = range === "range_6";

    const firstCalc =
      (1 -
        (fixedCostsPercent +
          shippingPercent +
          othersCostsPercent +
          profitPercent +
          rangeRatePercent)) *
      100;

    const secondCalc =
      (1 -
        (fixedCostsPercent +
          shippingPercent +
          othersCostsPercent +
          profitPercent +
          salesIcmsPercent +
          rangeRatePercent)) *
      100;

    const result = isHighestRange ? secondCalc : firstCalc;

    console.log("@isHighestRange", isHighestRange);

    console.log("@result", result);
    return result;
  }

  return (
    (1 -
      (fixedCostsPercent +
        salesIcmsPercent +
        salesPisCofinsPercent +
        shippingPercent +
        othersCostsPercent +
        profitPercent)) *
    100
  );
}

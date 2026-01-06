interface MarkupCalcProps {
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
  profit: number;
}

export function markupCalc({
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
  profit,
}: MarkupCalcProps): number {
  const fixedCostsPercent = fixedCosts / 100;
  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;
  const shippingPercent = shipping / 100;
  const othersCostsPercent = othersCosts / 100;
  const profitPercent = profit / 100;

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

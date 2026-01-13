interface RealProfitInverseCalcProps {
  userProductPrice: number;
  fixedCosts: number;
  salesIcms: number;
  salesPisCofins: number;
  shipping: number;
  othersCosts: number;
}

export function realProfitInverseCalc({
  userProductPrice,
  fixedCosts,
  salesIcms,
  salesPisCofins,
  shipping,
  othersCosts,
}: RealProfitInverseCalcProps): number {
  const fixedCostsPercentage = fixedCosts / 100;
  const salesIcmsPercentage = salesIcms / 100;
  const salesPisCofinsPercentage = salesPisCofins / 100;
  const shippingPercentage = shipping / 100;
  const othersCostsPercentage = othersCosts / 100;

  const userProductAcquisitonCost =
    userProductPrice -
    userProductPrice *
      (fixedCostsPercentage +
        salesIcmsPercentage +
        salesPisCofinsPercentage +
        shippingPercentage +
        othersCostsPercentage);

  return userProductAcquisitonCost;
}

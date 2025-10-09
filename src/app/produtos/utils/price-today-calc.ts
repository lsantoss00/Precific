import Decimal from "decimal.js";

interface PriceTodayCalcProps {
  acquisitionCost: number;
  fixedCosts: number;
  shipping: number;
  othersCost: number;
  profit: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function priceTodayCalc({
  acquisitionCost,
  fixedCosts,
  shipping,
  othersCost,
  profit,
  salesIcms,
  salesPisCofins,
}: PriceTodayCalcProps): number {
  const acq = new Decimal(acquisitionCost);
  const percentSum = new Decimal(fixedCosts)
    .plus(shipping)
    .plus(othersCost)
    .plus(profit)
    .dividedBy(100);

  const value = acq.plus(acq.times(percentSum));

  const denominator = new Decimal(1)
    .minus(new Decimal(salesIcms).dividedBy(100))
    .minus(
      new Decimal(salesPisCofins)
        .dividedBy(100)
        .times(new Decimal(1).minus(new Decimal(salesIcms).dividedBy(100)))
    );

  const priceToday = value.dividedBy(denominator);

  return priceToday.toDecimalPlaces(2).toNumber();
}

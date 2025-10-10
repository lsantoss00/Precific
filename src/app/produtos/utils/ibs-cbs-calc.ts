import { taxCalc } from "./tax-calc";

interface IbsCbsCalcProps {
  priceToday: number;
  salesIcms: number;
  salesPisCofins: number;
  percentage: 0.01 | 0.09;
}

export function ibsCbsCalc({
  priceToday,
  salesIcms,
  salesPisCofins,
  percentage,
}: IbsCbsCalcProps): number {
  const result =
    (priceToday - taxCalc({ priceToday, salesIcms, salesPisCofins })) *
    percentage;

  return Number(result);
}

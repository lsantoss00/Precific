import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";

interface IcmsStCalcProps {
  suggestedProductPrice: number;
  mva: number;
  salesIcmsPercentage: number;
}

export function icmsStCalc({
  suggestedProductPrice,
  mva,
  salesIcmsPercentage,
}: IcmsStCalcProps) {
  const base = suggestedProductPrice + (suggestedProductPrice * mva) / 100;

  const salesIcms = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: salesIcmsPercentage,
  });

  const result = base * (salesIcmsPercentage / 100) - salesIcms;

  return result;
}

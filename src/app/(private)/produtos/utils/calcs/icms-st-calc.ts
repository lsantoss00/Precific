import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";

interface IcmsStCalcProps {
  suggestedProductPrice: number;
  mva: number;
  salesIcmsInput: number;
}

export function icmsStCalc({
  suggestedProductPrice,
  mva,
  salesIcmsInput,
}: IcmsStCalcProps) {
  const base = suggestedProductPrice + (suggestedProductPrice * mva) / 100;

  const salesIcms = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: salesIcmsInput,
  });

  const result = base * (salesIcmsInput / 100) - salesIcms;

  return result;
}

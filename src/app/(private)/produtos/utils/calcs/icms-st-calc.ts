import { getICMSRate } from "@/src/app/(private)/produtos/constants/icms-table";
import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";

interface IcmsStCalcProps {
  suggestedProductPrice: number;
  mva: number;
  salesIcmsInput: number;
  stateDestination?: string;
  hasIcmsSt: boolean;
}

export function icmsStCalc({
  suggestedProductPrice,
  mva,
  salesIcmsInput,
  stateDestination,
  hasIcmsSt,
}: IcmsStCalcProps) {
  const base = suggestedProductPrice + (suggestedProductPrice * mva) / 100;

  const salesIcms = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: salesIcmsInput,
  });

  const icmsStAliquot = hasIcmsSt
    ? getICMSRate(stateDestination!, stateDestination!)
    : salesIcmsInput;

  const result = base * (icmsStAliquot / 100) - salesIcms;

  return result;
}

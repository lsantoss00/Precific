import { percentageValueCalc } from "@/src/app/(private)/produtos/utils/calcs/percentage-value-calc";
import { getICMSRate } from "@/src/app/(private)/produtos/utils/icms-table";

interface IcmsStCalcProps {
  suggestedProductPrice: number;
  mva: number;
  salesIcmsInput: number;
  stateDestination?: string;
  isInterstate: boolean;
}

export function icmsStCalc({
  suggestedProductPrice, // To-do: alterar para um nome generico;
  mva,
  salesIcmsInput,
  stateDestination,
  isInterstate,
}: IcmsStCalcProps) {
  const base = suggestedProductPrice + (suggestedProductPrice * mva) / 100;

  const salesIcms = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: salesIcmsInput,
  });

  const icmsStAliquot = isInterstate
    ? getICMSRate(stateDestination!, stateDestination!)
    : salesIcmsInput;

  const result = base * (icmsStAliquot / 100) - salesIcms;

  return result;
}

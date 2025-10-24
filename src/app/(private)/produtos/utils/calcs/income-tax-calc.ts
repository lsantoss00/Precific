import { percentageValueCalc } from "./percentage-value-calc";

interface IncomeTaxCalcProps {
  unitPrice: number;
  icms: number;
  pisCofins: number;
}

export function incomeTaxCalc({
  unitPrice,
  icms,
  pisCofins,
}: IncomeTaxCalcProps): number {
  const icmsValue = percentageValueCalc({
    base: unitPrice,
    percentage: icms,
  });

  const baseForPisCofins = unitPrice - icmsValue;

  const pisCofinsValue = percentageValueCalc({
    base: baseForPisCofins,
    percentage: pisCofins,
  });

  const result = icmsValue + pisCofinsValue;

  console.log("result", result);

  return result;
}

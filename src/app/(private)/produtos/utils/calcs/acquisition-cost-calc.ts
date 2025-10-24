import { percentageValueCalc } from "./percentage-value-calc";

interface AcquisitionCostCalcProps {
  unitPrice: number;
  icms: number;
  pisCofins: number;
  icmsSt: number;
  ipi: number;
  others: number;
}

export function acquisitionCostCalc({
  unitPrice,
  icms,
  pisCofins,
  icmsSt,
  ipi,
  others,
}: AcquisitionCostCalcProps): number {
  const icmsValue = percentageValueCalc({
    base: unitPrice,
    percentage: icms,
  });

  const pisCofinsBase = unitPrice - icmsValue;
  const pisCofinsValue = percentageValueCalc({
    base: pisCofinsBase,
    percentage: pisCofins,
  });

  const icmsStValue = percentageValueCalc({
    base: unitPrice,
    percentage: icmsSt,
  });

  const ipiValue = percentageValueCalc({
    base: unitPrice,
    percentage: ipi,
  });

  const othersValue = percentageValueCalc({
    base: unitPrice,
    percentage: others,
  });

  const result =
    unitPrice -
    icmsValue -
    pisCofinsValue +
    icmsStValue +
    ipiValue +
    othersValue;

  return result;
}

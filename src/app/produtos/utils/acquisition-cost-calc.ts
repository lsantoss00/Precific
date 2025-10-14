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
}: AcquisitionCostCalcProps) {
  const icmsValue = unitPrice * (icms / 100);
  const pisCofinsValue = (unitPrice - icmsValue) * (pisCofins / 100);
  const icmsStValue = unitPrice * (icmsSt / 100);
  const ipiValue = unitPrice * (ipi / 100);
  const othersValue = unitPrice * (others / 100);

  const acquisitionCost =
    unitPrice -
    icmsValue -
    pisCofinsValue +
    icmsStValue +
    ipiValue +
    othersValue;

  const result = acquisitionCost;

  return {
    icmsValue: Number(icmsValue),
    pisCofinsValue: Number(pisCofinsValue),
    result: Number(result),
  };
}

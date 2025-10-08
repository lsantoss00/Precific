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
  const acquistionCost = unitPrice - icms - pisCofins + icmsSt + ipi + others;

  return acquistionCost;
}

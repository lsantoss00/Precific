interface AcquisitionCostCalcProps {
  unit_price: number;
  icms: number;
  pis_cofins: number;
  icms_st: number;
  ipi: number;
  others: number;
}

export function acquisitionCostCalc({
  unit_price,
  icms,
  pis_cofins,
  icms_st,
  ipi,
  others,
}: AcquisitionCostCalcProps): number {
  const acquistionCost =
    unit_price - icms - pis_cofins + icms_st + ipi + others;

  return acquistionCost;
}

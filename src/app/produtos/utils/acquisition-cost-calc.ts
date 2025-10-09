import Decimal from "decimal.js";

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
  const unit = new Decimal(unitPrice);

  const icmsValue = unit.times(new Decimal(icms).dividedBy(100));
  const pisCofinsValue = unit.times(new Decimal(pisCofins).dividedBy(100));
  const icmsStValue = unit.times(new Decimal(icmsSt).dividedBy(100));
  const ipiValue = unit.times(new Decimal(ipi).dividedBy(100));
  const othersValue = unit.times(new Decimal(others).dividedBy(100));

  const acquisitionCost = unit
    .minus(icmsValue)
    .minus(pisCofinsValue)
    .plus(icmsStValue)
    .plus(ipiValue)
    .plus(othersValue);

  return acquisitionCost.toDecimalPlaces(2).toNumber();
}

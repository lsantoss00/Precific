interface TaxCalcProps {
  priceToday: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function taxCalc({
  priceToday,
  salesIcms,
  salesPisCofins,
}: TaxCalcProps) {
  const icmsValue = priceToday * (salesIcms / 100);
  const baseForPisCofins = priceToday - icmsValue;
  const pisCofinsValue = baseForPisCofins * (salesPisCofins / 100);

  const result = icmsValue + pisCofinsValue;

  return {
    result: Number(result),
    icmsValue: Number(icmsValue),
    pisCofinsValue: Number(pisCofinsValue),
  };
}

interface TaxCalcProps {
  unitPrice: number;
  icms: number;
  pisCofins: number;
}

export function taxCalcEntrada({ unitPrice, icms, pisCofins }: TaxCalcProps) {
  const icmsValue = unitPrice * (icms / 100);
  const baseForPisCofins = unitPrice - icmsValue;
  const pisCofinsValue = baseForPisCofins * (pisCofins / 100);

  const result = icmsValue + pisCofinsValue;

  return {
    result: Number(result),
    icmsValue: Number(icmsValue),
    pisCofinsValue: Number(pisCofinsValue),
  };
}

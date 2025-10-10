type TaxCalcProps = {
  sales_icms: number;
  sales_pis_cofins: number;
};

export function taxCalc(priceToday: number, data: TaxCalcProps) {
  const icmsValue = priceToday * (data.sales_icms / 100);
  const baseForPisCofins = priceToday - icmsValue;
  const pisCofinsValue = baseForPisCofins * (data.sales_pis_cofins / 100);

  return icmsValue + pisCofinsValue;
}

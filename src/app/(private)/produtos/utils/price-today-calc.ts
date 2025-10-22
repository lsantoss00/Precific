interface PriceTodayCalcProps {
  acquisitionCost: number;
  fixedCosts: number;
  shipping: number;
  othersCost: number;
  profit: number;
  salesIcms: number;
  salesPisCofins: number;
}

export function priceTodayCalc({
  acquisitionCost,
  fixedCosts,
  shipping,
  othersCost,
  profit,
  salesIcms,
  salesPisCofins,
}: PriceTodayCalcProps) {
  const percentSum = VFA + (fixedCosts + shipping + othersCost) / 100;

  const value = acquisitionCost + acquisitionCost * percentSum;

  //plus - > const 1base = value + value * (profit / 100);

  const salesIcmsPercent = salesIcms / 100;
  const salesPisCofinsPercent = salesPisCofins / 100;

  const denominator = 1 - salesIcmsPercent - salesPisCofinsPercent; // GABRIELLA MANDOU TIRAR: * (1 - salesIcmsPercent)

  const priceToday = value / denominator;

  //change - > const priceToday = 1base / denominator;

  const result = priceToday.toFixed(2);

  return {
    result: Number(result),
    value: Number(value),
  };
}

// BC_IRPJ_CSLL = priceToday - fixedCosts - shipping - othersCost - unitPrice - ICMS_venda_value - pisCofins_venda_value

// percentIRPJ_CSLL = 34 / 100
// IRPJ_CSLL = BC_IRPJ_CSLL * percentIRPJ_CSLL

// recICMS = ICMS_venda_value - ICMS_compra_value
// recPIS_COFINS = pisCofins_venda_value - pisCofins_compra_value

// card results \/
// LUCRO_LIQUIDO = priceToday - fixedCosts - shipping - othersCost - unitPrice - IRPJ_CSLL - recICMS - recPIS_COFINS
// margemLiq = LUCRO_LIQUIDO / priceToday

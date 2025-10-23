interface LiquidProfitCalcProps {
  priceToday: number;
  fixedCosts: number;
  shipping: number;
  othersCost: number;
  salesIcms: number;
  salesPisCofins: number;
  icms: number;
  pisCofins: number;
  unitPrice: number;
  irpjCsllPercent: 24 | 34;
  taxRegime: "realProfit" | "presumedProfit" | "simpleNational";
}

export function liquidProfitCalc({
  priceToday,
  fixedCosts,
  shipping,
  othersCost,
  salesIcms,
  salesPisCofins,
  icms,
  pisCofins,
  unitPrice,
  irpjCsllPercent,
}: LiquidProfitCalcProps) {
  const bcIrpjCsll =
    priceToday -
    fixedCosts -
    shipping -
    othersCost -
    unitPrice -
    salesIcms -
    salesPisCofins;

  const irpjCsllAliquot = irpjCsllPercent / 100;
  const irpjCsll = bcIrpjCsll * irpjCsllAliquot;

  let icmsRec;

  if (salesIcms === 0) {
    icmsRec = 0;
  } else {
    icmsRec = salesIcms - icms;
  }

  const pisCofinsRec = salesPisCofins - pisCofins;

  const result =
    priceToday -
    fixedCosts -
    shipping -
    othersCost -
    unitPrice -
    irpjCsll -
    icmsRec -
    pisCofinsRec;

  return Number(result);
}

// BC_IRPJ_CSLL = priceToday - fixedCosts - shipping - othersCost - unitPrice - ICMS_venda_value - pisCofins_venda_value

// percentIRPJ_CSLL = 34 / 100
// IRPJ_CSLL = BC_IRPJ_CSLL * percentIRPJ_CSLL

// recICMS = ICMS_venda_value - ICMS_compra_value
// recPIS_COFINS = pisCofins_venda_value - pisCofins_compra_value

// card results \/
// LUCRO_LIQUIDO = priceToday - fixedCosts - shipping - othersCost - unitPrice - IRPJ_CSLL - recICMS - recPIS_COFINS
// margemLiq = LUCRO_LIQUIDO / priceToday

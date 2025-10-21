interface IbsCbsCalcProps {
  unitPrice: number;
  pisCofins: number;
  icms: number;
}

export function ibsCbsCalc({ unitPrice, pisCofins, icms }: IbsCbsCalcProps) {
  const baseIbsCbsCalc = unitPrice - pisCofins - icms;

  const ibsResult = baseIbsCbsCalc * 0.001;

  const cbsResult = baseIbsCbsCalc * 0.009;

  return {
    ibs: Number(ibsResult),
    cbs: Number(cbsResult),
    baseIbsdCbsCalc: Number(baseIbsCbsCalc),
  };
}

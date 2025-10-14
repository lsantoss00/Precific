interface IbsCbsCalcProps {
  acquisitionCost: number;
  pisCofins: number;
  icms: number;
}

export function ibsCbsCalc({
  acquisitionCost,
  pisCofins,
  icms,
}: IbsCbsCalcProps) {
  const baseIbsCbsCalc = acquisitionCost - pisCofins - icms;

  const ibsResult = baseIbsCbsCalc * 0.001;

  const cbsResult = baseIbsCbsCalc * 0.009;

  return {
    ibs: Number(ibsResult),
    cbs: Number(cbsResult),
  };
}

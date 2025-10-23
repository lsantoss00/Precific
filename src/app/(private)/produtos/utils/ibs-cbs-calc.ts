interface IbsCbsCalcProps {
  base1: number;
}

export function ibsCbsCalc({ base1 }: IbsCbsCalcProps) {
  const ibsResult = base1 * 0.001;

  const cbsResult = base1 * 0.009;

  return {
    ibs: Number(ibsResult),
    cbs: Number(cbsResult),
  };
}

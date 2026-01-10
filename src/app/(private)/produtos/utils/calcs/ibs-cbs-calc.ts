interface IbsCbsCalcProps {
  base1: number;
}

export function ibsCbsCalc({ base1 }: IbsCbsCalcProps): {
  ibs: number;
  cbs: number;
} {
  const ibsResult = base1 * 0.001;

  const cbsResult = base1 * 0.009;

  return {
    ibs: ibsResult,
    cbs: cbsResult,
  };
}

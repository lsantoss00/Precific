interface IbsCbsCalcProps {
  base: number;
}

export function ibsCbsCalc({ base }: IbsCbsCalcProps): {
  ibs: number;
  cbs: number;
} {
  const ibsResult = base * 0.001;
  const cbsResult = base * 0.009;

  return {
    ibs: ibsResult,
    cbs: cbsResult,
  };
}

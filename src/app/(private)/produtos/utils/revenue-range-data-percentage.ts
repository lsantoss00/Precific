interface GetRevenueRangeDataPercentageProps {
  business: boolean;
}

export function getRevenueRangeDataPercentage({
  business,
}: GetRevenueRangeDataPercentageProps) {
  return {
    "range-1": business ? 4 : 4.5,
    "range-2": business ? 7.3 : 7.8,
    "range-3": business ? 9.5 : 10,
    "range-4": business ? 10.7 : 11.2,
    "range-5": business ? 14.3 : 14.7,
    "range-6": business ? 19 : 30,
  } as const;
}

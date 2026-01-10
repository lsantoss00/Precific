interface GetRevenueRangeDataPercentageProps {
  business: boolean;
}

export function getRevenueRangeDataPercentage({
  business,
}: GetRevenueRangeDataPercentageProps) {
  return {
    range_1: business ? 4 : 4.5,
    range_2: business ? 7.3 : 7.8,
    range_3: business ? 9.5 : 10,
    range_4: business ? 10.7 : 11.2,
    range_5: business ? 14.3 : 14.7,
    range_6: business ? 19 : 30,
  } as const;
}

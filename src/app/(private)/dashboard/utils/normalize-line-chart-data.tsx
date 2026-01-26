import { monthYearFormatter } from "@/src/app/(private)/dashboard/helpers/month-year-formatter";
import { ProductsPriceHistoryType } from "@/src/app/(private)/dashboard/types/products-price-history-type";

export const normalizeLineChartData = (data: ProductsPriceHistoryType[]) => {
  const map = new Map<
    string,
    { date: string; rawDate: Date; [key: string]: any }
  >();

  data.forEach((product) => {
    if (!product.dailyHistory) return;

    const key = product.productId;

    product.dailyHistory.forEach((history) => {
      const formattedDate = monthYearFormatter(history.date);

      if (!map.has(formattedDate)) {
        map.set(formattedDate, {
          date: formattedDate,
          rawDate: new Date(history.date),
        });
      }

      map.get(formattedDate)![key] = history.priceToday;
    });
  });

  return Array.from(map.values())
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
    .map(({ rawDate, ...item }) => item);
};

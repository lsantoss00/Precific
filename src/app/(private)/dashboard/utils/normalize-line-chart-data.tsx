import { monthYearFormatter } from "@/src/app/(private)/dashboard/helpers/month-year-formatter";
import { ProductPriceHistoryType } from "@/src/app/(private)/dashboard/types/products-price-history-type";

export const normalizeLineChartData = (data: ProductPriceHistoryType[]) => {
  const map = new Map<string, any>();

  data.forEach((product) => {
    if (!product.dailyHistory) return;

    const key = product.productId;

    product.dailyHistory.forEach((history) => {
      const formattedDate = monthYearFormatter(history.date);

      if (!map.has(formattedDate)) {
        map.set(formattedDate, { date: formattedDate });
      }

      map.get(formattedDate)[key] = history.priceToday;
    });
  });

  return Array.from(map.values());
};

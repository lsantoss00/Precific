import { dateFormatter } from "@/src/helpers/date-formatter";

type HistoryItem = {
  date: string;
  changedAt: string;
  [key: string]: any;
};

type ProductHistory = {
  productId: string;
  productName: string;
  dailyHistory?: HistoryItem[];
};

export const normalizeLineChartData = <T extends ProductHistory>(
  data: T[],
  valueKey: string,
) => {
  const map = new Map<
    string,
    { date: string; rawDate: Date; [key: string]: any }
  >();

  data.forEach((product) => {
    if (!product.dailyHistory) return;

    const key = product.productId;

    product.dailyHistory.forEach((history) => {
      const dateKey = dateFormatter(history.date) ?? history.date;

      if (!map.has(dateKey)) {
        map.set(dateKey, {
          date: dateKey,
          rawDate: new Date(history.date),
        });
      }

      map.get(dateKey)![key] = history[valueKey];
    });
  });

  return Array.from(map.values())
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
    .map(({ rawDate, ...item }) => item);
};

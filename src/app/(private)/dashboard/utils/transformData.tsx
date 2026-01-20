import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import { ProductPriceHistoryType } from "@/src/app/(private)/dashboard/types/products-price-history-type";
import { ChartConfig } from "@/src/components/core/chart";

export const transformProductsPriceHistoryToChartData = (
  products: ProductPriceHistoryType[] | undefined,
): { data: ChartDataType[]; config: ChartConfig } => {
  if (!products || products.length === 0) {
    return { data: [], config: {} };
  }

  const dateMap = new Map<string, any>();

  const productKeyMap = new Map<string, string>();

  products.forEach((product) => {
    const sanitizedKey = `p_${product.productId.replace(/-/g, "_")}`;
    productKeyMap.set(product.productId, sanitizedKey);
  });

  products.forEach((product) => {
    if (!product.dailyHistory) return;

    const productKey = productKeyMap.get(product.productId)!;

    product.dailyHistory.forEach((item) => {
      const dateKey = item.date;

      const dateFormatted = new Date(item.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });

      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { Data: dateFormatted });
      }

      const entry = dateMap.get(dateKey);
      entry[productKey] = item.priceToday;
    });
  });

  const chartData = Array.from(dateMap.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([_, value]) => {
      products.forEach((product) => {
        const productKey = productKeyMap.get(product.productId)!;
        if (!(productKey in value)) {
          value[productKey] = null;
        }
      });
      return value;
    });

  const chartConfig: ChartConfig = {
    Data: { label: "Data" },
  };

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  products.forEach((product, index) => {
    const productKey = productKeyMap.get(product.productId)!;
    chartConfig[productKey] = {
      label: product.productName,
      color: colors[index % colors.length],
    };
  });

  return { data: chartData, config: chartConfig };
};

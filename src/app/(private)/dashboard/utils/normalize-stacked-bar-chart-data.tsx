import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import { ProductPriceCompositionType } from "@/src/app/(private)/dashboard/types/products-price-composition-type";

const METRIC_MAPPING = {
  "Custos Fixos": "fixedCosts",
  Frete: "shipping",
  "Outros Custos": "otherCosts",
  ICMS: "icms",
  "ICMS ST": "icmsSt",
  IPI: "ipi",
  "PIS/COFINS": "pisCofins",
  Lucro: "profit",
} as const;

export const getMetricNames = (): string[] => {
  return Object.keys(METRIC_MAPPING);
};

export const normalizeStackedBarChartData = (
  products: ProductPriceCompositionType[],
): ChartDataType[] => {
  return products
    .filter((product) => product.metrics)
    .map((product) => {
      const normalizedData: ChartDataType = {
        productName: product.productName,
      };

      Object.entries(METRIC_MAPPING).forEach(([label, key]) => {
        normalizedData[label] = product.metrics![key] ?? 0;
      });

      return normalizedData;
    });
};

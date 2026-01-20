import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import { ProductPriceCompositionType } from "@/src/app/(private)/dashboard/types/products-price-composition-type";

export const normalizeStackedBarChartData = (
  products: ProductPriceCompositionType[],
): ChartDataType[] => {
  return products
    .filter((product) => product.metrics)
    .map((product) => ({
      productName: product.productName,
      "Custos Fixos": product.metrics!.fixedCosts,
      Frete: product.metrics!.shipping,
      "Outros Custos": product.metrics!.otherCosts,
      ICMS: product.metrics!.icms,
      "ICMS ST": product.metrics!.icmsSt,
      IPI: product.metrics!.ipi,
      "PIS/COFINS": product.metrics!.pisCofins,
      Lucro: product.metrics!.profit,
    }));
};

export const getMetricNames = (): string[] => {
  return [
    "Custos Fixos",
    "Frete",
    "Outros Custos",
    "ICMS",
    "ICMS ST",
    "IPI",
    "PIS/COFINS",
    "Lucro",
  ];
};

import { ChartConfig } from "@/src/components/core/chart";

export const createChartConfig = <T>(
  products: T[],
  options: {
    getId: (item: T) => string | undefined;
    getLabel?: (item: T) => string | undefined;
  },
  includeDate: boolean = true,
): ChartConfig => {
  const config: ChartConfig = {};

  if (includeDate) {
    config.date = { label: "Data" };
  }

  products.forEach((product, index) => {
    const id = options.getId(product);
    if (!id) return;

    config[id] = {
      label: options.getLabel?.(product) ?? "Produto",
      color: `var(--chart-${(index % 8) + 1})`,
    };
  });

  return config;
};

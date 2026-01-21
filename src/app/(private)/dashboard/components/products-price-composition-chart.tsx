import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPriceComposition } from "@/src/app/(private)/dashboard/services/get-products-price-composition";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import {
  getMetricNames,
  normalizeStackedBarChartData,
} from "@/src/app/(private)/dashboard/utils/normalize-stacked-bar-chart-data";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsPriceCompositionChartProps {
  filters: ChartFiltersType;
}

const ProductsPriceCompositionChart = ({
  filters,
}: ProductsPriceCompositionChartProps) => {
  const { data: productsPriceComposition } = useQuery({
    queryKey: ["products-price-composition", filters.productIds],
    queryFn: () => getProductsPriceComposition({ filters }),
  });

  const data = productsPriceComposition || [];

  const chartData = normalizeStackedBarChartData(data);
  const chartConfig = createChartConfig(
    getMetricNames().map((name) => ({ name })),
    {
      getId: (item) => item.name,
      getLabel: (item) => item.name,
    },
    false,
  );

  return (
    <div className="relative">
      <ChartCard
        title="Composição de Preços"
        description="Distribuição de cada custo por produto"
        contentClassName="h-full w-full"
      >
        <StackedBarChart
          data={chartData}
          config={chartConfig}
          xAxisKey="productName"
          barKeys={getMetricNames()}
          stackId="a"
          barRadius={8}
          className="aspect-square"
          tooltip={
            <CustomChartTooltip chartConfig={chartConfig} type="percentage" />
          }
        />
      </ChartCard>
      <Show when={!filters?.productIds.length}>
        <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
          <p className="text-center font-semibold text-sm sm:text-base">
            Selecione ao menos 1 produto para visualizar o gráfico.
          </p>
        </div>
      </Show>
    </div>
  );
};
export default ProductsPriceCompositionChart;

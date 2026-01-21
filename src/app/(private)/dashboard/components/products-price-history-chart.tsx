import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import LineChart from "@/src/app/(private)/dashboard/components/line-chart";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsPriceHistory } from "@/src/app/(private)/dashboard/services/get-products-price-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import { normalizeLineChartData } from "@/src/app/(private)/dashboard/utils/normalize-line-chart-data";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsPriceHistoryChartProps {
  filters: ChartFiltersType;
}

const ProductsPriceHistoryChart = ({
  filters,
}: ProductsPriceHistoryChartProps) => {
  const { data: productsPriceHistory } = useQuery({
    queryKey: [
      "products-price-history",
      filters.fromDate,
      filters.toDate,
      filters.productIds,
    ],
    queryFn: () => getProductsPriceHistory({ filters }),
  });

  const data = productsPriceHistory || [];

  const chartData = normalizeLineChartData(data);
  const chartConfig = createChartConfig(data, {
    getId: (product) => product.productId,
    getLabel: (product) => product.productName,
  });

  return (
    <div className="relative">
      <ChartCard
        title="Histórico de Preços"
        description="Evolução de preços dos produtos selecionados"
        contentClassName="h-full w-full"
      >
        <LineChart
          data={chartData}
          config={chartConfig}
          xAxisKey="date"
          lineType="monotone"
          strokeWidth={3}
          className="aspect-square"
          margin={{ top: 32, left: 32, right: 32 }}
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
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
export default ProductsPriceHistoryChart;

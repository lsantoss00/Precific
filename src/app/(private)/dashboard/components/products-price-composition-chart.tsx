import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPriceComposition } from "@/src/app/(private)/dashboard/services/get-products-price-composition";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import {
  getMetricNames,
  normalizeStackedBarChartData,
} from "@/src/app/(private)/dashboard/utils/normalize-stacked-bar-chart-data";
import { ChartConfig } from "@/src/components/core/chart";
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
  const chartConfig: ChartConfig = {
    "Custos Fixos": { label: "Custos Fixos", color: "var(--chart-1)" },
    Frete: { label: "Frete", color: "var(--chart-2)" },
    "Outros Custos": { label: "Outros Custos", color: "var(--chart-3)" },
    ICMS: { label: "ICMS", color: "var(--chart-4)" },
    "ICMS ST": { label: "ICMS ST", color: "var(--chart-5)" },
    IPI: { label: "IPI", color: "var(--chart-6)" },
    "PIS/COFINS": { label: "PIS/COFINS", color: "var(--chart-7)" },
    Lucro: { label: "Lucro", color: "var(--chart-8)" },
  };
  return (
    <div className="relative">
      <ChartCard
        title="Stacked Bar Chart"
        description="Gráfico de Barras Empilhadas"
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
        />
      </ChartCard>
      <Show when={!filters?.productIds.length}>
        <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
          <p className="text-center font-semibold text-sm sm:text-base">
            Selecione ao menos 1 produto para visualizar o gráfico de Histórico
            de Preços.
          </p>
        </div>
      </Show>
    </div>
  );
};
export default ProductsPriceCompositionChart;

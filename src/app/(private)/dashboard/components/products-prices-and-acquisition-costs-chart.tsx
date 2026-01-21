import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPricesAndAcquisitionCosts } from "@/src/app/(private)/dashboard/services/get-products-prices-and-acquisition-costs";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsPricesAndAcquisitionCostsChartProps {
  productIds: string[];
}

const ProductsPricesAndAcquisitionCostsChart = ({
  productIds,
}: ProductsPricesAndAcquisitionCostsChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-prices-and-acquisition-costs", productIds],
    queryFn: () => getProductsPricesAndAcquisitionCosts({ productIds }),
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    "Custo de Aquisição": product.acquisitionCost,
    "Preço de Venda": product.priceToday,
  }));

  const chartConfig: ChartConfig = {
    "Custo de Aquisição": {
      label: "Custo de Aquisição",
      color: "var(--chart-2)",
    },
    "Preço de Venda": {
      label: "Preço de Venda",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="relative">
      <ChartCard
        title="Comparativo"
        description="Preço de Venda VS Preço de Aquisição dos produtos selecionados"
        contentClassName="h-full w-full"
      >
        <StackedBarChart
          data={chartData}
          config={chartConfig}
          xAxisKey="name"
          barKeys={["Custo de Aquisição", "Preço de Venda"]}
          stackId="a"
          barRadius={8}
          className="aspect-square"
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
      <Show when={!productIds || productIds.length === 0}>
        <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
          <p className="text-center font-semibold text-sm sm:text-base">
            Selecione ao menos 1 produto para visualizar o gráfico.
          </p>
        </div>
      </Show>
    </div>
  );
};

export default ProductsPricesAndAcquisitionCostsChart;

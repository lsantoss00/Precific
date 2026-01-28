import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPricesAndNetProfits } from "@/src/app/(private)/dashboard/services/get-products-prices-and-net-profits";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsPricesAndNetProfitsChartProps {
  productIds: string[];
}

const ProductsPricesAndNetProfitsChart = ({
  productIds,
}: ProductsPricesAndNetProfitsChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-prices-and-net-profits", productIds],
    queryFn: () => getProductsPricesAndNetProfits({ productIds }),
    enabled: productIds?.length > 0,
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    "Lucro Líquido": product.netProfit,
    "Preço de Venda": product.priceToday,
  }));

  const chartConfig: ChartConfig = {
    "Lucro Líquido": {
      label: "Lucro Líquido",
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
        description="Preço de Venda X Lucro Líquido"
        contentClassName="h-full w-full"
      >
        <StackedBarChart
          data={chartData}
          config={chartConfig}
          xAxisKey="name"
          barKeys={["Lucro Líquido", "Preço de Venda"]}
          stackId="a"
          barRadius={8}
          className="aspect-square"
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
      <Show when={!productIds || productIds.length === 0}>
        <EmptyProductFilterMessage />
      </Show>
    </div>
  );
};

export default ProductsPricesAndNetProfitsChart;

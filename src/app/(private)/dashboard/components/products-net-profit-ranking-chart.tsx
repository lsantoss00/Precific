import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsNetProfit } from "@/src/app/(private)/dashboard/services/get-products-net-profit";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsNetProfitRankingChartProps {
  productIds?: string[];
  type?: "filtered" | "unfiltered";
  sortDirection: "asc" | "desc";
  description: string;
}

const ProductsNetProfitRankingChart = ({
  type = "unfiltered",
  productIds,
  sortDirection,
  description,
}: ProductsNetProfitRankingChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-net-profit", sortDirection, productIds],
    queryFn: () => getProductsNetProfit({ sortDirection, productIds }),
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    netProfit: product.netProfit,
  }));

  const chartConfig: ChartConfig = {
    netProfit: {
      label: "Lucro Líquido",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Lucro Líquido"
        description={description}
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
        headerClassName="mb-4"
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="name"
          barKey="netProfit"
          layout="vertical"
          barRadius={8}
          className="max-sm:aspect-square lg:aspect-square xl:aspect-video max-h-62.5"
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
      <Show
        when={type === "filtered" && (!productIds || productIds.length === 0)}
      >
        <EmptyProductFilterMessage />
      </Show>
    </div>
  );
};

export default ProductsNetProfitRankingChart;

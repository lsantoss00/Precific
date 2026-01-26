import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsFixedCosts } from "@/src/app/(private)/dashboard/services/get-products-fixed-costs";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsFixedCostsRankingChartProps {
  productIds?: string[];
  type?: "filtered" | "unfiltered";
  sortDirection: "asc" | "desc";
  description: string;
}

const ProductsFixedCostsRankingChart = ({
  type = "unfiltered",
  productIds,
  sortDirection,
  description,
}: ProductsFixedCostsRankingChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-fixed-costs", sortDirection, productIds],
    queryFn: () => getProductsFixedCosts({ sortDirection, productIds }),
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    fixedCosts: product.fixedCosts,
  }));

  const chartConfig: ChartConfig = {
    fixedCosts: {
      label: "Custo Fixo (%)",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Custo Fixo"
        description={description}
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
        headerClassName="mb-4"
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="name"
          barKey="fixedCosts"
          layout="horizontal"
          barRadius={8}
          className="max-sm:aspect-square lg:aspect-square xl:aspect-video max-h-62.5"
          tooltip={
            <CustomChartTooltip chartConfig={chartConfig} type="percentage" />
          }
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

export default ProductsFixedCostsRankingChart;

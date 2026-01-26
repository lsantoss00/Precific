import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsFixedCosts } from "@/src/app/(private)/dashboard/services/get-products-fixed-costs";
import { ChartConfig } from "@/src/components/core/chart";
import { useQuery } from "@tanstack/react-query";

interface ProductsFixedCostsRankingChartProps {
  productIds?: string[];
  sortDirection: "asc" | "desc";
  description: string;
}

const ProductsFixedCostsRankingChart = ({
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
    </div>
  );
};

export default ProductsFixedCostsRankingChart;

import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsShipping } from "@/src/app/(private)/dashboard/services/get-products-shipping";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsShippingRankingChartProps {
  productIds?: string[];
  type?: "filtered" | "unfiltered";
  sortDirection: "asc" | "desc";
  description: string;
}

const ProductsShippingRankingChart = ({
  type = "unfiltered",
  productIds,
  sortDirection,
  description,
}: ProductsShippingRankingChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-shipping", sortDirection, productIds],
    queryFn: () => getProductsShipping({ sortDirection, productIds }),
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    shipping: product.shipping,
  }));

  const chartConfig: ChartConfig = {
    shipping: {
      label: "Frete (%)",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Frete"
        description={description}
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
        headerClassName="mb-4"
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="name"
          barKey="shipping"
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

export default ProductsShippingRankingChart;

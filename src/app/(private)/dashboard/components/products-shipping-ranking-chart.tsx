import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsShipping } from "@/src/app/(private)/dashboard/services/get-products-shipping";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ProductsShippingRankingChartProps {
  filters?: ChartFiltersType;
}

const ProductsShippingRankingChart = ({
  filters,
}: ProductsShippingRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: products } = useQuery({
    queryKey: ["products-shipping", sortDirection, filters],
    queryFn: () => getProductsShipping({ sortDirection, filters }),
  });

  const chartData = (products || []).map((product, index) => ({
    name: product.name,
    shipping: product.shipping,
    fill: `var(--chart-${(index % 10) + 1})`,
  }));

  const chartConfig: ChartConfig = {
    shipping: {
      label: "Frete (%)",
    },
  };

  const isAscending = sortDirection === "asc";

  const chartCardDescription = isAscending
    ? "Mostrando produtos menos sensíveis a frete."
    : "Mostrando produtos mais sensíveis a frete.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Frete"
        description={chartCardDescription}
        headerClassName="mb-4"
        headerAction={
          <Button onClick={toggleSortDirection} variant="outline">
            <Show
              when={isAscending}
              fallback={<ArrowDown className="h-4 w-4" />}
            >
              <ArrowUp className="h-4 w-4" />
            </Show>
          </Button>
        }
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="name"
          barKey="shipping"
          layout="vertical"
          barRadius={8}
          className="max-h-72"
          tooltip={
            <CustomChartTooltip chartConfig={chartConfig} type="percentage" />
          }
        />
      </ChartCard>
    </div>
  );
};

export default ProductsShippingRankingChart;

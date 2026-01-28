import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsNetProfit } from "@/src/app/(private)/dashboard/services/get-products-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ProductsNetProfitRankingChartProps {
  filters?: ChartFiltersType;
}

const ProductsNetProfitRankingChart = ({
  filters,
}: ProductsNetProfitRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: products } = useQuery({
    queryKey: ["products-net-profit", sortDirection, filters],
    queryFn: () => getProductsNetProfit({ sortDirection, filters }),
  });

  const chartData = (products || []).map((product, index) => ({
    name: product.name,
    netProfit: product.netProfit,
    fill: `var(--chart-${(index % 10) + 1})`,
  }));

  const chartConfig: ChartConfig = {
    netProfit: {
      label: "Lucro Líquido",
    },
  };

  const isAscending = sortDirection === "asc";

  const chartCardDescription = isAscending
    ? "Mostrando produtos com menor lucro líquido."
    : "Mostrando produtos com maior lucro líquido.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Lucro Líquido"
        description={chartCardDescription}
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
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
          barKey="netProfit"
          layout="vertical"
          barRadius={8}
          className="max-sm:aspect-square lg:aspect-square xl:aspect-video max-h-62.5"
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
    </div>
  );
};

export default ProductsNetProfitRankingChart;

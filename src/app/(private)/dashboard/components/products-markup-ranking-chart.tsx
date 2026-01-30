import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsMarkup } from "@/src/app/(private)/dashboard/services/get-products-markup";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

interface ProductsMarkupRankingChartProps {
  filters?: ChartFiltersType;
}

const ProductsMarkupRankingChart = ({
  filters,
}: ProductsMarkupRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: products } = useQuery({
    queryKey: ["products-markup", sortDirection, filters],
    queryFn: () => getProductsMarkup({ sortDirection, filters }),
  });

  const chartData = (products || []).map((product, index) => ({
    name: product.name,
    markup: product.markup,
    fill: `var(--chart-${(index % 10) + 1})`,
  }));

  const chartConfig: ChartConfig = {
    markup: {
      label: "Markup (%)",
    },
  };

  const isAscending = sortDirection === "asc";

  const chartCardDescription = isAscending
    ? "Mostrando produtos com menor markup."
    : "Mostrando produtos com maior markup.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <ChartCard
      title="Ranking de Markup"
      description={chartCardDescription}
      headerClassName="mb-4"
      headerAction={
        <div className="2xl:ml-8">
          <Button onClick={toggleSortDirection} variant="outline">
            <Show
              when={isAscending}
              fallback={<ArrowDown className="h-4 w-4" />}
            >
              <ArrowUp className="h-4 w-4" />
            </Show>
          </Button>
        </div>
      }
    >
      <BarChart
        data={chartData}
        config={chartConfig}
        yAxisKey="name"
        barKey="markup"
        layout="horizontal"
        barRadius={8}
        className="lg:aspect-square"
        tooltip={
          <CustomChartTooltip chartConfig={chartConfig} type="percentage" />
        }
      />
    </ChartCard>
  );
};

export default ProductsMarkupRankingChart;

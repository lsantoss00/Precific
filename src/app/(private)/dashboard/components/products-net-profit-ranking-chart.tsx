import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsNetProfit } from "@/src/app/(private)/dashboard/services/get-products-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface ProductsNetProfitRankingChartProps {
  filters?: ChartFiltersType;
}

const ProductsNetProfitRankingChart = ({
  filters,
}: ProductsNetProfitRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["products-net-profit", sortDirection, filters],
    queryFn: () => getProductsNetProfit({ sortDirection, filters }),
    placeholderData: keepPreviousData,
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
    <ChartCard
      title="Ranking de Lucro Líquido"
      description={chartCardDescription}
      pending={isPending}
      fetching={isFetching}
      headerAction={
        <Button
          onClick={toggleSortDirection}
          variant="outline"
          className="w-8 h-8 relative"
          disabled={isPending || isFetching}
        >
          <ArrowDownUp className={`${isAscending && "text-primary"}`} />
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
        className="h-72"
        tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        pending={isPending}
      />
    </ChartCard>
  );
};

export default ProductsNetProfitRankingChart;

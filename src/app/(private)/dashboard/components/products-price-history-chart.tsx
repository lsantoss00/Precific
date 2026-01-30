import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import LineChart from "@/src/app/(private)/dashboard/components/line-chart";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import ProductsWithNoHistoryFilterMessage from "@/src/app/(private)/dashboard/components/products-with-no-history-filter-message";
import { getProductsPriceHistory } from "@/src/app/(private)/dashboard/services/get-products-price-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import { normalizeLineChartData } from "@/src/app/(private)/dashboard/utils/normalize-line-chart-data";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsPriceHistoryChartProps {
  filters: ChartFiltersType;
}

const ProductsPriceHistoryChart = ({
  filters,
}: ProductsPriceHistoryChartProps) => {
  const { data: productsPriceHistory } = useQuery({
    queryKey: ["products-price-history", filters],
    queryFn: () =>
      getProductsPriceHistory({
        filters,
      }),
    enabled: Boolean(filters.productIds && filters.productIds.length > 0),
  });

  const data = productsPriceHistory || [];

  const chartData = normalizeLineChartData(data, "priceToday");
  const chartConfig = createChartConfig(data, {
    getId: (product) => product.productId,
    getLabel: (product) => product.productName,
  });

  const productsWithHistory = data.filter(
    (product) => product.dailyHistory && product.dailyHistory.length > 1,
  );

  const hasProductsSelected =
    filters.productIds && filters.productIds.length > 0;
  const noProductsHaveHistory =
    hasProductsSelected && productsWithHistory.length === 0;

  return (
    <div className="relative">
      <ChartCard
        title="Histórico de Preços"
        description="Evolução dos preços no período selecionado."
        contentClassName="h-full w-full"
      >
        <LineChart
          data={chartData}
          config={chartConfig}
          xAxisKey="date"
          lineType="monotone"
          strokeWidth={3}
          className="h-72"
          margin={{ top: 5, left: 32, right: 32, bottom: 5 }}
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
      <Show when={!hasProductsSelected}>
        <EmptyProductFilterMessage />
      </Show>
      <Show when={hasProductsSelected && noProductsHaveHistory}>
        <ProductsWithNoHistoryFilterMessage
          products={filters.productIds?.length ?? 0}
        />
      </Show>
    </div>
  );
};
export default ProductsPriceHistoryChart;

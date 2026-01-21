import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsMarkup } from "@/src/app/(private)/dashboard/services/get-products-markup";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ChartConfig } from "@/src/components/core/chart";
import { useQuery } from "@tanstack/react-query";

interface ProductsWithHighestMarkupChartProps {
  filters?: ChartFiltersType;
}

const ProductsWithHighestMarkupChart = ({
  filters,
}: ProductsWithHighestMarkupChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-with-highest-markup", filters?.productIds],
    queryFn: () => getProductsMarkup({}),
  });

  const chartData = (products || []).map((product) => ({
    productName: product.name,
    markup: product.markup,
  }));

  const chartConfig: ChartConfig = {
    markup: {
      label: "Markup (%)",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="relative">
      <ChartCard
        title="Ranking de Markup"
        description="Produtos com menor markup"
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
        headerClassName="mb-4"
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="productName"
          barKey="markup"
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

export default ProductsWithHighestMarkupChart;

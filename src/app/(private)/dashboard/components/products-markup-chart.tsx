import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import { getProductsMarkup } from "@/src/app/(private)/dashboard/services/get-products-markup";
import { ChartConfig } from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";

interface ProductsMarkupChartProps {
  productIds?: string[];
  type?: "filtered" | "unfiltered";
  sortDirection: "asc" | "desc";
  title?: string;
  description: string;
}

const ProductsMarkupChart = ({
  type = "unfiltered",
  productIds,
  sortDirection,
  title = "Ranking de Markup",
  description,
}: ProductsMarkupChartProps) => {
  const { data: products } = useQuery({
    queryKey: ["products-markup", sortDirection, productIds],
    queryFn: () => getProductsMarkup({ sortDirection, productIds }),
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
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
        title={title}
        description={description}
        className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
        headerClassName="mb-4"
      >
        <BarChart
          data={chartData}
          config={chartConfig}
          yAxisKey="name"
          barKey="markup"
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
        <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
          <p className="text-center font-semibold text-sm sm:text-base">
            Selecione ao menos 1 produto para visualizar o gráfico.
          </p>
        </div>
      </Show>
    </div>
  );
};

export default ProductsMarkupChart;

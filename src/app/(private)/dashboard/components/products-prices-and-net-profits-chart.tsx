import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/line-chart/custom-chart-tooltip";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPricesAndNetProfits } from "@/src/app/(private)/dashboard/services/get-products-prices-and-net-profits";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ProductsPricesAndNetProfitsChartProps {
  productIds: string[];
}

const ProductsPricesAndNetProfitsChart = ({
  productIds,
}: ProductsPricesAndNetProfitsChartProps) => {
  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["products-prices-and-net-profits", productIds],
    queryFn: () => getProductsPricesAndNetProfits({ productIds }),
    placeholderData: keepPreviousData,
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    "Lucro Líquido": product.netProfit,
    "Preço de Venda": product.priceToday,
  }));

  const chartConfig: ChartConfig = {
    "Lucro Líquido": {
      label: "Lucro Líquido",
      color: "var(--chart-2)",
    },
    "Preço de Venda": {
      label: "Preço de Venda",
      color: "var(--chart-4)",
    },
  };

  const chartCardDescription =
    productIds?.length > 0
      ? "Mostrando dados para os produtos selecionados."
      : "Mostrando dados para os últimos 10 produtos precificados.";

  return (
    <ChartCard
      title="Preço de Venda X Lucro Líquido"
      description={chartCardDescription}
      contentClassName="h-full w-full"
      pending={isPending}
      fetching={isFetching}
    >
      <StackedBarChart
        data={chartData}
        config={chartConfig}
        xAxisKey="name"
        barKeys={["Lucro Líquido", "Preço de Venda"]}
        stackId="a"
        barRadius={8}
        className="h-72"
        pending={isPending}
        tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
      />
    </ChartCard>
  );
};

export default ProductsPricesAndNetProfitsChart;

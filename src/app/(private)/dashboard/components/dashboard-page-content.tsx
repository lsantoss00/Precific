"use client";

import { getProductsPriceComposition } from "@/src/app/(private)/dashboard/services/get-products-price-composition";
import { getProductsPriceHistory } from "@/src/app/(private)/dashboard/services/get-products-price-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import { normalizeLineChartData } from "@/src/app/(private)/dashboard/utils/normalize-line-chart-data";
import {
  getMetricNames,
  normalizeStackedBarChartData,
} from "@/src/app/(private)/dashboard/utils/normalize-stacked-bar-chart-data";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { ChartConfig } from "@/src/components/core/chart";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import {
  ChartCard,
  CustomLineChartTooltip,
  DashboardFilters,
  LineChart,
  StackedBarChart,
} from ".";

const DashboardPageContent = () => {
  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: subMonths(new Date(), 3),
    toDate: new Date(),
    productIds: [],
  });

  const { data: productsPriceHistory } = useQuery({
    queryKey: [
      "products-price-history",
      filters.fromDate,
      filters.toDate,
      filters.productIds,
    ],
    queryFn: () => getProductsPriceHistory({ filters }),
  });

  const data = productsPriceHistory || [];

  const chartData = normalizeLineChartData(data);
  const chartConfig = createChartConfig(data, {
    getId: (product) => product.productId,
    getLabel: (product) => product.productName,
  });

  const { data: productsPriceComposition } = useQuery({
    queryKey: ["products-price-composition", filters.productIds],
    queryFn: () => getProductsPriceComposition({ filters }),
  });

  const data2 = productsPriceComposition || [];

  const chartData2 = normalizeStackedBarChartData(data2);
  const chartConfig2: ChartConfig = {
    "Custos Fixos": { label: "Custos Fixos", color: "var(--chart-1)" },
    Frete: { label: "Frete", color: "var(--chart-2)" },
    "Outros Custos": { label: "Outros Custos", color: "var(--chart-3)" },
    ICMS: { label: "ICMS", color: "var(--chart-4)" },
    "ICMS ST": { label: "ICMS ST", color: "var(--chart-5)" },
    IPI: { label: "IPI", color: "var(--chart-6)" },
    "PIS/COFINS": { label: "PIS/COFINS", color: "var(--chart-7)" },
    Lucro: { label: "Lucro", color: "var(--chart-8)" },
  };

  return (
    <Column className="gap-4 relative">
      <Row className="items-center gap-2 z-20">
        <LayoutDashboard size={26} />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <DashboardFilters value={filters} onChange={setFilters} />
      <ChartCard
        title="Stacked Bar Chart"
        description="Gráfico de Barras Empilhadas"
        className="sm:col-span-3 lg:col-span-2 md:row-span-1"
        contentClassName="h-full"
      >
        <StackedBarChart
          data={chartData2}
          config={chartConfig2}
          xAxisKey="productName"
          barKeys={getMetricNames()}
          stackId="a"
          barRadius={8}
          className="aspect-square"
        />
      </ChartCard>
      <div className="relative">
        <ChartCard
          title="Histórico de Preços"
          description="Evolução de preços dos produtos selecionados"
          className="sm:col-span-3 lg:col-span-2 md:row-span-1"
          contentClassName="h-100 w-full"
        >
          <LineChart
            data={chartData}
            config={chartConfig}
            xAxisKey="date"
            lineType="monotone"
            strokeWidth={3}
            className="aspect-square"
            margin={{ top: 32, left: 32, right: 32 }}
            tooltip={<CustomLineChartTooltip chartConfig={chartConfig} />}
          />
        </ChartCard>
        <Show when={!filters?.productIds.length}>
          <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
            <p className="text-center font-semibold text-sm sm:text-base">
              Selecione ao menos 1 produto para visualizar o gráfico de
              Histórico de Preços.
            </p>
          </div>
        </Show>
      </div>
    </Column>
  );
};

export default DashboardPageContent;

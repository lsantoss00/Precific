"use client";

import ProductPriceHistoryChart from "@/src/app/(private)/dashboard/components/product-price-history-chart";
import { getProductsPriceComposition } from "@/src/app/(private)/dashboard/services/get-products-price-composition";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import {
  getMetricNames,
  normalizeStackedBarChartData,
} from "@/src/app/(private)/dashboard/utils/normalize-stacked-bar-chart-data";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { ChartConfig } from "@/src/components/core/chart";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { ChartCard, DashboardFilters, StackedBarChart } from ".";

const DashboardPageContent = () => {
  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: subMonths(new Date(), 3),
    toDate: new Date(),
    productIds: [],
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
      <ProductPriceHistoryChart filters={filters} />
    </Column>
  );
};

export default DashboardPageContent;

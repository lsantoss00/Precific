"use client";

import CustomLineChartTooltip from "@/src/app/(private)/dashboard/components/custom-line-chart-tooltip";
import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import { getProductsPriceHistory } from "@/src/app/(private)/dashboard/services/get-products-price-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import { normalizeLineChartData } from "@/src/app/(private)/dashboard/utils/normalize-line-chart-data";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { ChartCard, LineChart } from "../components";

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

  return (
    <Column className="gap-4 relative">
      <Row className="items-center gap-2 z-20">
        <LayoutDashboard size={26} />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <DashboardFilters value={filters} onChange={setFilters} />
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

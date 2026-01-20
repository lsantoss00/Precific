"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import { getProductsPriceHistory } from "@/src/app/(private)/dashboard/services/get-products-price-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { transformProductsPriceHistoryToChartData } from "@/src/app/(private)/dashboard/utils/transformData";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useMemo, useState } from "react";
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

  const { data: priceChartData, config: priceChartConfig } = useMemo(
    () => transformProductsPriceHistoryToChartData(productsPriceHistory),
    [productsPriceHistory],
  );

  return (
    <Column className="gap-4 relative">
      <Row className="items-center gap-2 z-20">
        <LayoutDashboard size={26} />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <DashboardFilters value={filters} onChange={setFilters} />
      <ChartCard
        title="Histórico de Preços"
        description="Evolução de preços dos produtos selecionados"
        className="sm:col-span-3 lg:col-span-2 md:row-span-1"
        contentClassName="h-100 w-full"
      >
        <LineChart
          data={priceChartData}
          config={priceChartConfig}
          xAxisKey="Data"
          lineType="monotone"
          strokeWidth={3}
          className="aspect-square"
        />
      </ChartCard>
    </Column>
  );
};

export default DashboardPageContent;

"use client";

import ProductsPriceHistoryChart from "@/src/app/(private)/dashboard/components/products-price-history-chart";
import ProductsPricesAndAcquisitionCostsChart from "@/src/app/(private)/dashboard/components/products-prices-and-acquisition-costs-chart";
import ProductsWithHighestMarkupChart from "@/src/app/(private)/dashboard/components/products-with-highest-markup-chart";
import ProductsWithLowestMarkupChart from "@/src/app/(private)/dashboard/components/products-with-lowest-markup-chart";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { DashboardFilters } from ".";

const DashboardPageContent = () => {
  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: subMonths(new Date(), 3),
    toDate: new Date(),
    productIds: [],
  });

  return (
    <Column className="gap-4 relative">
      <Row className="items-center gap-2 z-20">
        <LayoutDashboard size={26} />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <Column className="gap-4">
        <h2 className="text-xl">Gráficos Gerais</h2>
        <div className="grid grid-cols-2 gap-4">
          <ProductsWithHighestMarkupChart />
          <ProductsWithLowestMarkupChart />
        </div>
      </Column>
      <Column className="gap-4">
        <h2 className="text-xl">Gráficos por produtos</h2>
        <DashboardFilters value={filters} onChange={setFilters} />
        <div className="grid grid-cols-2 gap-4">
          <ProductsPriceHistoryChart filters={filters} />
          <ProductsPricesAndAcquisitionCostsChart
            productIds={filters.productIds!}
          />
          <ProductsWithHighestMarkupChart productIds={filters.productIds} />
          <ProductsWithLowestMarkupChart productIds={filters.productIds} />
        </div>
      </Column>
    </Column>
  );
};

export default DashboardPageContent;

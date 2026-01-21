"use client";

import ProductPriceHistoryChart from "@/src/app/(private)/dashboard/components/product-price-history-chart";
import ProductsPriceCompositionChart from "@/src/app/(private)/dashboard/components/products-price-composition-chart";
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
      <DashboardFilters value={filters} onChange={setFilters} />
      <ProductsPriceCompositionChart filters={filters} />
      <ProductPriceHistoryChart filters={filters} />
    </Column>
  );
};

export default DashboardPageContent;

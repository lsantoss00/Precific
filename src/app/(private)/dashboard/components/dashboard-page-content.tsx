"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import ProductsAverageAcquisitionCostKpiCard from "@/src/app/(private)/dashboard/components/products-average-acquisition-cost-kpi-card";
import ProductsAverageNetProfitKpiCard from "@/src/app/(private)/dashboard/components/products-average-net-profit-kpi-card";
import ProductsAveragePriceKpiCard from "@/src/app/(private)/dashboard/components/products-average-price-kpi-card";
import ProductsAverageProfitabilityKpiCard from "@/src/app/(private)/dashboard/components/products-average-profitability-kpi-card";
import ProductsFixedCostsRankingChart from "@/src/app/(private)/dashboard/components/products-fixed-costs-ranking-chart";
import ProductsMarkupRankingChart from "@/src/app/(private)/dashboard/components/products-markup-ranking-chart";
import ProductsNetProfitHistoryChart from "@/src/app/(private)/dashboard/components/products-net-profit-history-chart";
import ProductsNetProfitRankingChart from "@/src/app/(private)/dashboard/components/products-net-profit-ranking-chart";
import ProductsPriceHistoryChart from "@/src/app/(private)/dashboard/components/products-price-history-chart";
import ProductsPricesAndAcquisitionCostsChart from "@/src/app/(private)/dashboard/components/products-prices-and-acquisition-costs-chart";
import ProductsPricesAndNetProfitsChart from "@/src/app/(private)/dashboard/components/products-prices-and-net-profits-chart";
import ProductsShippingRankingChart from "@/src/app/(private)/dashboard/components/products-shipping-ranking-chart";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";
import { CircleX, LayoutDashboard, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";

const DashboardPageContent = () => {
  const { company, isLoadingAuth } = useAuth();

  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: undefined,
    toDate: undefined,
    productIds: undefined,
  });

  const companyHasProducts = company ? company.productsQuantity > 0 : null;

  if (isLoadingAuth)
    return <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />;

  return (
    <Column className="gap-4 relative flex-1">
      <Flex className="2xl:items-center gap-2 justify-between flex-col-reverse 2xl:flex-row">
        <Row className="items-center gap-2">
          <LayoutDashboard size={26} className="shrink-0" />
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <ComingSoonBadge />
        </Row>
        <Flex className="bg-secondary/5 border border-secondary rounded-md gap-2 p-2 mb-4 items-center">
          <TriangleAlert className="text-secondary shrink-0" />
          <span className="text-sm">
            Esta página ainda está em desenvolvimento. Os valores mostrados
            podem estar incompletos ou incorretos.
          </span>
        </Flex>
      </Flex>
      <Show
        when={companyHasProducts}
        fallback={
          <Column className="grow items-center justify-center gap-4">
            <div className="relative">
              <LayoutDashboard size={64} />
              <CircleX
                size={32}
                className="absolute -right-3 -bottom-2 bg-red-400 text-white rounded-full"
              />
            </div>
            <Column className="text-center gap-2">
              <p className="text-lg md:text-xl">Seu dashboard está vazio...</p>
              <span className="text-sm md:text-base text-muted-foreground">
                Assim que você adicionar um produto, as informações vão aparecer
                aqui.
              </span>
            </Column>
          </Column>
        }
      >
        <Column className="gap-4">
          <DashboardFilters value={filters} onChange={setFilters} />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-4">
            <ProductsAveragePriceKpiCard filters={filters} />
            <ProductsAverageAcquisitionCostKpiCard filters={filters} />
            <ProductsAverageNetProfitKpiCard filters={filters} />
            <ProductsAverageProfitabilityKpiCard filters={filters} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductsMarkupRankingChart filters={filters} />
            <ProductsNetProfitRankingChart filters={filters} />
            <ProductsShippingRankingChart filters={filters} />
            <ProductsFixedCostsRankingChart filters={filters} />
            <ProductsPricesAndAcquisitionCostsChart
              productIds={filters.productIds!}
            />
            <ProductsPricesAndNetProfitsChart
              productIds={filters.productIds!}
            />
            <ProductsPriceHistoryChart filters={filters} />
            <ProductsNetProfitHistoryChart filters={filters} />
          </div>
        </Column>
      </Show>
    </Column>
  );
};

export default DashboardPageContent;

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
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import PremiumFeatureWrapper from "@/src/components/premium-feature-wrapper";
import { useAuth } from "@/src/providers/auth-provider";
import { CircleX, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const DashboardPageContent = () => {
  const { company, isPremium } = useAuth();

  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: undefined,
    toDate: undefined,
    productIds: undefined,
  });

  const companyHasProducts = company ? company.productsQuantity > 0 : null;

  return (
    <Column className="gap-4 relative flex-1">
      <Row className="items-center gap-2">
        <LayoutDashboard size={26} className="shrink-0" />
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </Row>
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
            <PremiumFeatureWrapper isPremium={!isPremium}>
              <ProductsAverageNetProfitKpiCard filters={filters} />
            </PremiumFeatureWrapper>
            <PremiumFeatureWrapper isPremium={!isPremium}>
              <ProductsAverageProfitabilityKpiCard filters={filters} />
            </PremiumFeatureWrapper>
          </div>
          <div className="grid grid-cols-8 gap-4 items-stretch">
            <div className="col-span-8 2xl:col-span-6 h-full">
              <ProductsNetProfitRankingChart filters={filters} />
            </div>
            <div className="col-span-8 lg:col-span-4 2xl:col-span-2">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsMarkupRankingChart filters={filters} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsFixedCostsRankingChart filters={filters} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 2xl:col-span-4">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsShippingRankingChart filters={filters} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsPricesAndAcquisitionCostsChart
                  productIds={filters.productIds!}
                />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsPricesAndNetProfitsChart
                  productIds={filters.productIds!}
                />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsPriceHistoryChart filters={filters} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={!isPremium}>
                <ProductsNetProfitHistoryChart filters={filters} />
              </PremiumFeatureWrapper>
            </div>
          </div>
        </Column>
      </Show>
    </Column>
  );
};

export default DashboardPageContent;

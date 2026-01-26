"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import ProductsAverageAcquisitionCostKpiCard from "@/src/app/(private)/dashboard/components/products-average-acquisition-cost-kpi-card";
import ProductsAverageNetProfitKpiCard from "@/src/app/(private)/dashboard/components/products-average-net-profit-kpi-card";
import ProductsAveragePriceKpiCard from "@/src/app/(private)/dashboard/components/products-average-price-kpi-card";
import ProductsAverageProfitabilityKpiCard from "@/src/app/(private)/dashboard/components/products-average-profitability-kpi-card";
import ProductsMarkupRankingChart from "@/src/app/(private)/dashboard/components/products-markup-ranking-chart";
import ProductsNetProfitRankingChart from "@/src/app/(private)/dashboard/components/products-net-profit-chart";
import ProductsPriceHistoryChart from "@/src/app/(private)/dashboard/components/products-price-history-chart";
import ProductsPricesAndAcquisitionCostsChart from "@/src/app/(private)/dashboard/components/products-prices-and-acquisition-costs-chart";
import ProductsShippingRankingChart from "@/src/app/(private)/dashboard/components/products-shipping-ranking-chart";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/core/accordion";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { subMonths } from "date-fns";
import { LayoutDashboard, TriangleAlert } from "lucide-react";
import { useState } from "react";

const DashboardPageContent = () => {
  const [filters, setFilters] = useState<ChartFiltersType>({
    fromDate: subMonths(new Date(), 3),
    toDate: new Date(),
    productIds: [],
  });

  return (
    <Column className="gap-4 relative">
      <Flex className="2xl:items-center gap-2 justify-between flex-col-reverse 2xl:flex-row">
        <Row className="items-center gap-2">
          <LayoutDashboard size={26} className="shrink-0" />
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <ComingSoonBadge />
        </Row>
        <Flex className="bg-secondary/5 border border-secondary rounded-md gap-2 p-2 items-center">
          <TriangleAlert className="text-secondary shrink-0" />
          <span className="text-sm">
            Esta página ainda está em desenvolvimento. Os valores mostrados
            podem estar incompletos ou incorretos.
          </span>
        </Flex>
      </Flex>
      <Accordion
        type="multiple"
        className="w-full h-full"
        defaultValue={["general-charts", "product-charts"]}
      >
        <AccordionItem value="general-charts">
          <AccordionTrigger className="lg:text-lg font-bold">
            <h2 className="text-xl font-medium">Gráficos Gerais</h2>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-4">
              <ProductsAveragePriceKpiCard />
              <ProductsAverageAcquisitionCostKpiCard />
              <ProductsAverageNetProfitKpiCard />
              <ProductsAverageProfitabilityKpiCard />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductsMarkupRankingChart
                sortDirection="desc"
                description="Os 10 produtos precificados com maior markup"
              />
              <ProductsMarkupRankingChart
                sortDirection="asc"
                description="Os 10 produtos precificados com menor markup"
              />
              <ProductsNetProfitRankingChart
                sortDirection="desc"
                description="Os 10 produtos precificados com maior lucro líquido"
              />
              <ProductsNetProfitRankingChart
                sortDirection="asc"
                description="Os 10 produtos precificados com menor lucro líquido"
              />
              <ProductsShippingRankingChart
                sortDirection="desc"
                description="Os 10 produtos precificados mais sensíveis a frete"
              />
              <ProductsShippingRankingChart
                sortDirection="asc"
                description="Os 10 produtos precificados menos sensíveis a frete"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="product-charts">
          <AccordionTrigger className="lg:text-lg font-bold">
            <h2 className="text-xl font-medium">Gráficos Comparativos</h2>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <Column className="gap-4">
              <DashboardFilters value={filters} onChange={setFilters} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductsPriceHistoryChart filters={filters} />
                <ProductsPricesAndAcquisitionCostsChart
                  productIds={filters.productIds!}
                />
                <ProductsMarkupRankingChart
                  productIds={filters.productIds}
                  sortDirection="desc"
                  description="Produtos com maior markup"
                  type="filtered"
                />
                <ProductsMarkupRankingChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos com menor markup"
                  type="filtered"
                />
                <ProductsNetProfitRankingChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos com menor lucro líquido"
                  type="filtered"
                />
                <ProductsNetProfitRankingChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos com maior lucro líquido"
                  type="filtered"
                />
                <ProductsShippingRankingChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos menos sensíveis a frete"
                  type="filtered"
                />
                <ProductsShippingRankingChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos mais sensíveis a frete"
                  type="filtered"
                />
              </div>
            </Column>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Column>
  );
};

export default DashboardPageContent;

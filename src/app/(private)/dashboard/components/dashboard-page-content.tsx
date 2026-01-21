"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import ProductsMarkupChart from "@/src/app/(private)/dashboard/components/products-markup-chart";
import ProductsPriceHistoryChart from "@/src/app/(private)/dashboard/components/products-price-history-chart";
import ProductsPricesAndAcquisitionCostsChart from "@/src/app/(private)/dashboard/components/products-prices-and-acquisition-costs-chart";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/core/accordion";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { subMonths } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

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
      <Accordion
        type="multiple"
        className="w-full h-full"
        defaultValue={["general-charts", "product-charts"]}
      >
        <AccordionItem value="general-charts">
          <AccordionTrigger className="lg:text-lg font-bold">
            <h2 className="text-xl font-medium">Gráficos Gerais</h2>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div className="grid grid-cols-2 gap-4">
              <ProductsMarkupChart
                sortDirection="desc"
                description="Os 10 produtos precificados com maior markup"
              />
              <ProductsMarkupChart
                sortDirection="asc"
                description="Os 10 produtos precificados com menor markup"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="product-charts">
          <AccordionTrigger className="lg:text-lg font-bold">
            <h2 className="text-xl font-medium">Gráficos por produtos</h2>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <Column className="gap-4">
              <DashboardFilters value={filters} onChange={setFilters} />
              <div className="grid grid-cols-2 gap-4">
                <ProductsPriceHistoryChart filters={filters} />
                <ProductsPricesAndAcquisitionCostsChart
                  productIds={filters.productIds!}
                />
                <ProductsMarkupChart
                  productIds={filters.productIds}
                  sortDirection="desc"
                  description="Produtos com maior markup"
                />
                <ProductsMarkupChart
                  productIds={filters.productIds}
                  sortDirection="asc"
                  description="Produtos com menor markup"
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

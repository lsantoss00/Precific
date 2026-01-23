import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageProfitability } from "@/src/app/(private)/dashboard/services/get-products-average-profitability";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { BadgePercent } from "lucide-react";

interface ProductsAverageProfitabilityKpiCardProps {
  filters?: ChartFiltersType;
  type?: "filtered" | "unfiltered";
}

const ProductsAverageProfitabilityKpiCard = ({
  type = "unfiltered",
  filters,
}: ProductsAverageProfitabilityKpiCardProps) => {
  const { data: averageProfitability } = useQuery({
    queryKey: [
      "products-average-profitability",
      filters?.fromDate,
      filters?.toDate,
      filters?.productIds,
    ],
    queryFn: () =>
      getProductsAverageProfitability({
        fromDate: filters?.fromDate!,
        toDate: filters?.toDate!,
        productIds: filters?.productIds!,
      }),
  });

  return (
    <div className="relative">
      <KpiCard
        title="Rentabilidade Média"
        icon={<BadgePercent className="text-muted-foreground h-4 w-4" />}
        value={averageProfitability ?? 0}
        type="percentage"
      />
      <Show
        when={
          type === "filtered" &&
          (!filters?.productIds || filters?.productIds.length === 0)
        }
      >
        <EmptyProductFilterMessage />
      </Show>
    </div>
  );
};

export default ProductsAverageProfitabilityKpiCard;

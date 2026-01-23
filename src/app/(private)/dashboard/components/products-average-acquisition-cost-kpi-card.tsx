import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageAcquisitionCost } from "@/src/app/(private)/dashboard/services/get-products-average-acquisition-cost";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { BanknoteArrowDown } from "lucide-react";

interface ProductsAverageAcquisitionCostKpiCardProps {
  filters?: ChartFiltersType;
  type?: "filtered" | "unfiltered";
}

const ProductsAverageAcquisitionCostKpiCard = ({
  type = "unfiltered",
  filters,
}: ProductsAverageAcquisitionCostKpiCardProps) => {
  const { data: averageAcquisitionCost } = useQuery({
    queryKey: [
      "products-average-acquisition-cost",
      filters?.fromDate,
      filters?.toDate,
      filters?.productIds,
    ],
    queryFn: () =>
      getProductsAverageAcquisitionCost({
        fromDate: filters?.fromDate!,
        toDate: filters?.toDate!,
        productIds: filters?.productIds!,
      }),
  });

  return (
    <div className="relative">
      <KpiCard
        title="Custo Médio"
        icon={<BanknoteArrowDown className="text-muted-foreground h-4 w-4" />}
        value={averageAcquisitionCost ?? 0}
        type="currency"
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

export default ProductsAverageAcquisitionCostKpiCard;

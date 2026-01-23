import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageNetProfit } from "@/src/app/(private)/dashboard/services/get-products-average-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";

interface ProductsAverageNetProfitKpiCardProps {
  filters?: ChartFiltersType;
  type?: "filtered" | "unfiltered";
}

const ProductsAverageNetProfitKpiCard = ({
  type = "unfiltered",
  filters,
}: ProductsAverageNetProfitKpiCardProps) => {
  const { data: averageAcquisitionCost } = useQuery({
    queryKey: [
      "products-average-net-profit",
      filters?.fromDate,
      filters?.toDate,
      filters?.productIds,
    ],
    queryFn: () =>
      getProductsAverageNetProfit({
        fromDate: filters?.fromDate!,
        toDate: filters?.toDate!,
        productIds: filters?.productIds!,
      }),
  });

  return (
    <div className="relative">
      <KpiCard
        title="Lucro Líquido Médio"
        icon={<Tag className="text-muted-foreground h-4 w-4" />}
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

export default ProductsAverageNetProfitKpiCard;

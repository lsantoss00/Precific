import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAveragePrice } from "@/src/app/(private)/dashboard/services/get-products-average-price";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Show from "@/src/components/core/show";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react";

interface ProductsMarkupChartProps {
  filters?: ChartFiltersType;
  type?: "filtered" | "unfiltered";
}

const ProductsAveragePriceKpiCard = ({
  type = "unfiltered",
  filters,
}: ProductsMarkupChartProps) => {
  const { data: averagePrice } = useQuery({
    queryKey: [
      "products-average-price",
      filters?.fromDate,
      filters?.toDate,
      filters?.productIds,
    ],
    queryFn: () =>
      getProductsAveragePrice({
        fromDate: filters?.fromDate!,
        toDate: filters?.toDate!,
        productIds: filters?.productIds!,
      }),
  });

  return (
    <div className="relative">
      <KpiCard
        title="Preço Médio de Venda"
        icon={<Tag className="text-muted-foreground h-4 w-4" />}
        value={averagePrice}
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

export default ProductsAveragePriceKpiCard;

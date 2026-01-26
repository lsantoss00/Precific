import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageNetProfit } from "@/src/app/(private)/dashboard/services/get-products-average-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { useQuery } from "@tanstack/react-query";
import { HandCoins } from "lucide-react";

interface ProductsAverageNetProfitKpiCardProps {
  filters?: ChartFiltersType;
}

const ProductsAverageNetProfitKpiCard = ({
  filters,
}: ProductsAverageNetProfitKpiCardProps) => {
  const { data: averageNetProfit } = useQuery({
    queryKey: [
      "products-average-net-profit",
      filters?.fromDate,
      filters?.toDate,
      filters?.productIds,
    ],
    queryFn: () =>
      getProductsAverageNetProfit({
        fromDate: filters?.fromDate,
        toDate: filters?.toDate,
        productIds: filters?.productIds,
      }),
  });

  return (
    <KpiCard
      title="Lucro Líquido Médio"
      icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
      value={averageNetProfit ?? 0}
      type="currency"
    />
  );
};

export default ProductsAverageNetProfitKpiCard;

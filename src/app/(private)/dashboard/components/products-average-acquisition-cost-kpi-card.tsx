import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageAcquisitionCost } from "@/src/app/(private)/dashboard/services/get-products-average-acquisition-cost";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { useQuery } from "@tanstack/react-query";
import { BanknoteArrowDown } from "lucide-react";

interface ProductsAverageAcquisitionCostKpiCardProps {
  filters?: ChartFiltersType;
}

const ProductsAverageAcquisitionCostKpiCard = ({
  filters,
}: ProductsAverageAcquisitionCostKpiCardProps) => {
  const { data: averageAcquisitionCost } = useQuery({
    queryKey: ["products-average-acquisition-cost", filters],
    queryFn: () =>
      getProductsAverageAcquisitionCost({
        filters,
      }),
  });

  return (
    <KpiCard
      title="Custo Médio"
      icon={<BanknoteArrowDown className="text-muted-foreground h-4 w-4" />}
      value={averageAcquisitionCost ?? 0}
      type="currency"
    />
  );
};

export default ProductsAverageAcquisitionCostKpiCard;
